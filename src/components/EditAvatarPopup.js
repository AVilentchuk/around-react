import { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditAvatarPopup = ({ isOpen, onClose, updateCurrentUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const avatarInput = useRef();

  useEffect(() => {
    avatarInput.current.value = currentUser.avatar;
  }, [currentUser]);

  const formSubmit = (e) => {
    e.preventDefault();
    updateCurrentUser(
      Object.assign({}, currentUser, { avatar: avatarInput.current.value })
    );
    onClose();
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      windowId='w-editpic'
      formHeader='Change profile picture'
      formName='editprofpic'
      onSubmit={formSubmit}
    >
      <label htmlFor='pictureurl' className='form__field'>
        <input
          ref={avatarInput}
          className='form__input'
          type='url'
          name='avatar'
          id='pictureurl'
          placeholder='insert url for picture'
          required
        />
        <span className='form__input-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
