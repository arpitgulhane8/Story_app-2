import React from "react";
import "../styles/Modal.css";

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ⓧ
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
