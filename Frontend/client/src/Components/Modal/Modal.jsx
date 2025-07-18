import React from 'react';
import styles from './Modal.module.css';

function Modal({ title, children, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar" }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>
          {children}
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>{cancelText}</button>
          <button className={styles.confirmBtn} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
