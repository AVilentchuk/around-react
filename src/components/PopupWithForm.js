import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_active" : ""}`}
      onClick={props.onClose}
    >
      <div className='popup__window' id={props.id}>
        <button
          className='button button_type_close'
          type='button'
          aria-label='Close window'
          onClick={props.onClose}
        ></button>
        <h2 className='popup__title'>{props.formHeader}</h2>
        <form className='form' name={`${props.formName}`}>
          {props.children}
          <button
            className='button button_type_submit button_disabled'
            type='submit'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
