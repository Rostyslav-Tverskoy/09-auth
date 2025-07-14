"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./NoteModal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: Props) => {




  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onBackdropClick}>
      <div className={styles.modal}>
        {children}
        <button className={styles.backBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;