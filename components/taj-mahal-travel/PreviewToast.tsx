'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';

const ToastContext = createContext<((message: string) => void) | null>(null);

export function usePreviewToast() {
  const notify = useContext(ToastContext);
  if (!notify) throw new Error('Component previews must be rendered inside PreviewToast.');
  return notify;
}

/** Shared by every preview. Use the hook for actions, or data-preview-toast on simple demo buttons. */
export default function PreviewToast({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const sequence = useRef(0);
  const notify = useCallback((message: string) => {
    if (message.trim()) setToast({ id: ++sequence.current, message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(current => current?.id === toast.id ? null : current), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  return <ToastContext.Provider value={notify}>
    <div className="sc-toast-boundary" onClick={event => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>('[data-preview-toast]');
      if (trigger && event.currentTarget.contains(trigger)) {
        const message = trigger.dataset.previewToast;
        if (message) notify(message);
      }
    }}>
      {children}
      <div className="sc-toast-layer" role="status" aria-live="polite" aria-atomic="true">
        {toast && <div key={toast.id} className="sc-preview-toast"><HugeiconsIcon icon={CheckmarkCircle02Icon} aria-hidden="true" /><span>{toast.message}</span></div>}
      </div>
    </div>
  </ToastContext.Provider>;
}
