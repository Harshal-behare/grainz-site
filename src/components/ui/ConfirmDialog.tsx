import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from './Button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  isLoading = false
}) => {
  if (!isOpen) return null;

  const iconColors = {
    danger: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  };

  const buttonVariants: Record<string, 'primary' | 'secondary' | 'ghost' | 'outline'> = {
    danger: 'primary',
    warning: 'primary', 
    info: 'primary'
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-xl max-w-md w-full animate-scale-in">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border">
            <div className="flex items-start gap-3">
              {type !== 'info' && (
                <AlertTriangle className={`w-6 h-6 ${iconColors[type]}`} />
              )}
              <h3 className="text-lg font-semibold text-foreground">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-foreground-muted hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-foreground-secondary">
              {message}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              variant={buttonVariants[type]}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// Confirmation Hook
export const useConfirmDialog = () => {
  const [dialogState, setDialogState] = React.useState<{
    isOpen: boolean;
    props: Omit<ConfirmDialogProps, 'isOpen' | 'onClose' | 'onConfirm'>;
    resolver?: (value: boolean) => void;
  }>({
    isOpen: false,
    props: {
      title: '',
      message: ''
    }
  });

  const confirm = (props: Omit<ConfirmDialogProps, 'isOpen' | 'onClose' | 'onConfirm'>) => {
    return new Promise<boolean>((resolve) => {
      setDialogState({
        isOpen: true,
        props,
        resolver: resolve
      });
    });
  };

  const handleClose = () => {
    dialogState.resolver?.(false);
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    dialogState.resolver?.(true);
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  const ConfirmDialogComponent = () => (
    <ConfirmDialog
      isOpen={dialogState.isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      {...dialogState.props}
    />
  );

  return {
    confirm,
    ConfirmDialog: ConfirmDialogComponent
  };
};

export default ConfirmDialog;
