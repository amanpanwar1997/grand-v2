/**
 * ============================================================================
 * TOAST NOTIFICATION SYSTEM
 * ============================================================================
 * 
 * Modern toast notifications to replace alert() calls
 * Uses Sonner library for beautiful, accessible toasts
 * 
 * Usage:
 * ```tsx
 * import { toast } from '../utils/toast';
 * 
 * toast.success('Saved successfully!');
 * toast.error('Failed to save');
 * toast.promise(saveData(), {
 *   loading: 'Saving...',
 *   success: 'Saved!',
 *   error: 'Failed to save'
 * });
 * ```
 */

import { toast as sonnerToast } from 'sonner@2.0.3';

export const toast = {
  /**
   * Success toast
   */
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      duration: 3000,
    });
  },

  /**
   * Error toast
   */
  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      duration: 5000,
    });
  },

  /**
   * Warning toast
   */
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Info toast
   */
  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      duration: 3000,
    });
  },

  /**
   * Loading toast
   */
  loading: (message: string, description?: string) => {
    return sonnerToast.loading(message, {
      description,
    });
  },

  /**
   * Promise toast - automatically shows loading/success/error
   */
  promise: (
    promise: Promise<any>,
    messages: {
      loading: string;
      success: string | ((data: any) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, messages);
  },

  /**
   * Custom toast with action button
   */
  action: (message: string, actionLabel: string, onAction: () => void) => {
    sonnerToast(message, {
      action: {
        label: actionLabel,
        onClick: onAction,
      },
    });
  },

  /**
   * Dismiss a specific toast
   */
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    sonnerToast.dismiss();
  },
};

// Specialized admin toasts
export const adminToast = {
  /**
   * Save success
   */
  saved: (itemName: string = 'Item') => {
    toast.success(`✅ ${itemName} saved successfully!`);
  },

  /**
   * Delete success
   */
  deleted: (itemName: string = 'Item') => {
    toast.success(`🗑️ ${itemName} deleted successfully!`);
  },

  /**
   * Update success
   */
  updated: (itemName: string = 'Item') => {
    toast.success(`🔄 ${itemName} updated successfully!`);
  },

  /**
   * Create success
   */
  created: (itemName: string = 'Item') => {
    toast.success(`✨ ${itemName} created successfully!`);
  },

  /**
   * Permission denied
   */
  permissionDenied: () => {
    toast.error('🚫 Permission denied', 'You do not have permission to perform this action');
  },

  /**
   * Network error
   */
  networkError: () => {
    toast.error('🌐 Network error', 'Please check your internet connection and try again');
  },

  /**
   * Validation error
   */
  validationError: (fields: string[]) => {
    toast.error('⚠️ Validation error', `Please check: ${fields.join(', ')}`);
  },

  /**
   * Unsaved changes warning
   */
  unsavedChanges: (onSave: () => void, onDiscard: () => void) => {
    sonnerToast.warning('⚠️ Unsaved changes', {
      description: 'You have unsaved changes. Save before leaving?',
      action: {
        label: 'Save',
        onClick: onSave,
      },
      cancel: {
        label: 'Discard',
        onClick: onDiscard,
      },
      duration: 10000,
    });
  },

  /**
   * Bulk action success
   */
  bulkAction: (count: number, action: string) => {
    toast.success(`✅ ${count} items ${action} successfully!`);
  },

  /**
   * Import success
   */
  imported: (count: number, itemType: string = 'items') => {
    toast.success(`📥 ${count} ${itemType} imported successfully!`);
  },

  /**
   * Export success
   */
  exported: (filename: string) => {
    toast.success(`📤 Exported successfully!`, `File: ${filename}`);
  },
};