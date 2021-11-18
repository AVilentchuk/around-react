import React from "react";

const ConfirmPopup = ({ isOpen, onClose, confirmDelete }) => {
  const onConfirm = () => {
    confirmDelete();
    onClose();
  };
  return (
    <div className={`popup ${isOpen ? "popup_active" : ""}`} onClick={onClose}>
      <div
        className='popup__window'
        id='w-confirm'
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className='button button_type_close'
          type='button'
          aria-label='Close window'
          onClick={onClose}
        ></button>
        <h2 className='popup__title'>Are you sure?</h2>
        <button
          className='button button_type_submit'
          type='button'
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmPopup;
