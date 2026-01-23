/**
 * ============================================================================
 * EMPTY STATE COMPONENTS
 * ============================================================================
 * 
 * Beautiful empty states for admin panel
 */

import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-white/40" />
      </div>
      <h3 className="text-[22px] font-medium text-white mb-2">{title}</h3>
      <p className="text-[15px] text-white/60 max-w-md mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

/**
 * Empty search results
 */
export function EmptySearch({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="text-[60px] mb-4">🔍</div>
      <h3 className="text-[20px] font-medium text-white mb-2">No results found</h3>
      <p className="text-[15px] text-white/60">
        No results for "<span className="text-white font-medium">{searchQuery}</span>"
      </p>
      <p className="text-[14px] text-white/50 mt-2">Try adjusting your search or filters</p>
    </div>
  );
}

/**
 * Empty list
 */
export function EmptyList({ itemName }: { itemName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="text-[60px] mb-4">📭</div>
      <h3 className="text-[20px] font-medium text-white mb-2">No {itemName} yet</h3>
      <p className="text-[15px] text-white/60">
        Get started by creating your first {itemName.toLowerCase()}
      </p>
    </div>
  );
}

/**
 * Error state
 */
export function ErrorState({ 
  title = 'Something went wrong', 
  description = 'An error occurred while loading this content',
  onRetry 
}: { 
  title?: string; 
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="text-[60px] mb-4">⚠️</div>
      <h3 className="text-[20px] font-medium text-white mb-2">{title}</h3>
      <p className="text-[15px] text-white/60 max-w-md mb-6">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
