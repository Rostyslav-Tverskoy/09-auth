import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

interface Modal {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: Modal) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    function handleEscCloser(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscCloser);
    return () => {
      document.removeEventListener('keydown', handleEscCloser);
    };
  }, [onClose]);

  function handleClickCloser(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const modal = (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleClickCloser}
    >
      <div className={css.modal}>{children}</div>
    </div>
  );

  return createPortal(modal, document.body);
}
