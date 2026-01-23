import { useState, useEffect, useRef } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface UseAutoSaveOptions {
  slug: string;
  formData: any;
  user?: string;
  enabled?: boolean;
  interval?: number; // milliseconds
  onSave?: () => void;
  onError?: (error: Error) => void;
}

interface AutoSaveState {
  lastSaved: Date | null;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  error: Error | null;
}

/**
 * Auto-save hook for page editor
 * Automatically saves drafts every 30 seconds
 */
export function useAutoSave({
  slug,
  formData,
  user = 'admin',
  enabled = true,
  interval = 30000, // 30 seconds
  onSave,
  onError
}: UseAutoSaveOptions): AutoSaveState {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const lastFormDataRef = useRef<string>('');
  const timerRef = useRef<number | null>(null);

  // Track unsaved changes
  useEffect(() => {
    const currentFormData = JSON.stringify(formData);
    if (currentFormData !== lastFormDataRef.current && lastFormDataRef.current !== '') {
      setHasUnsavedChanges(true);
    }
  }, [formData]);

  // Auto-save function
  const saveDraft = async () => {
    if (!enabled || isSaving) return;

    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo/draft/save`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ slug, data: formData, user })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save draft');
      }

      const result = await response.json();
      
      if (result.success) {
        setLastSaved(new Date(result.savedAt));
        setHasUnsavedChanges(false);
        lastFormDataRef.current = JSON.stringify(formData);
        onSave?.();
      } else {
        throw new Error(result.error || 'Save failed');
      }
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
      console.error('Auto-save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Set up auto-save interval
  useEffect(() => {
    if (!enabled || !slug) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set up new timer
    timerRef.current = window.setInterval(() => {
      if (hasUnsavedChanges) {
        saveDraft();
      }
    }, interval);

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [enabled, slug, hasUnsavedChanges, formData, interval]);

  // Save on page unload (if there are unsaved changes)
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        // Try to save before leaving
        saveDraft();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, hasUnsavedChanges]);

  // Keyboard shortcut: Cmd/Ctrl + S
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveDraft();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, formData]);

  return {
    lastSaved,
    isSaving,
    hasUnsavedChanges,
    error
  };
}

/**
 * Format time ago for display
 */
export function formatTimeAgo(date: Date | null): string {
  if (!date) return 'Never';

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 10) return 'Just now';
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}
