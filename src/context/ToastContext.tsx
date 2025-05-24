import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/feedback/Toast';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

interface ToastOptions {
  variant?: ToastVariant;
  title?: string;
  description: string;
  duration?: number;
  action?: React.ReactNode;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => string;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastData extends ToastOptions {
  id: string;
  visible: boolean;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts(prev => [
      ...prev,
      {
        id,
        variant: options.variant || 'info',
        title: options.title,
        description: options.description,
        duration: options.duration || 5000,
        action: options.action,
        visible: true,
      },
    ]);
    
    return id;
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );
    
    // Clean up after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex max-w-xs flex-col gap-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            visible={toast.visible}
            duration={toast.duration}
            action={toast.action}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};