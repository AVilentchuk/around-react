const PopupWithForm = ({
  children,
  formName,
  formHeader,
  onClose,
  id,
  isOpen,
}) => {
  return (
    <div className={`popup ${isOpen ? "popup_active" : ""}`} onClick={onClose}>
      <div
        className='popup__window'
        id={id}
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
        <h2 className='popup__title'>{formHeader}</h2>
        <form className='form' name={`${formName}`}>
          {children}
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
