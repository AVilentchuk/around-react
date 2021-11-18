import { useCallback } from "react";
import FormValidator from "../utils/FormValidator";
const PopupWithForm = ({
  children,
  formName,
  formHeader,
  onClose,
  id,
  isOpen,
  onSubmit,
}) => {
  //useCallback is practically combined useEffect and createRef. do ignore the "unnecessary dependency: 'isOpen'" warning.
  //as it required to reset the form on reopening.
  const form = useCallback(
    (formNode) => {
      if (formNode !== null) {
        const validatedForm = new FormValidator(formNode);
        validatedForm.enableValidation();
        return validatedForm.resetValidation();
      }
    },
    [isOpen]
  );

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
        <form className='form' ref={form} name={`${formName}`}>
          {children}
          <button
            className='button button_type_submit'
            type='submit'
            onClick={onSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
