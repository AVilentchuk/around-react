import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, addNewCard }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const fromSubmit = (e) => {
    e.preventDefault();
    addNewCard({ name, link });
    onClose();
  };

  return (
    <div>
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        windowId='w-add'
        formHeader='New place'
        formName='addWindow'
        onSubmit={fromSubmit}
      >
        <label htmlFor='place-title' className='form__field'>
          <input
            className='form__input'
            type='text'
            name='name'
            id='place-title'
            placeholder='Title'
            required
            minLength='1'
            maxLength='30'
            onChange={(e) => setName(e.target.value)}
          />
          <span className='form__input-error'></span>
        </label>
        <label htmlFor='image-link' className='form__field'>
          <input
            className='form__input'
            type='url'
            name='link'
            id='image-link'
            placeholder='Image link'
            required
            onChange={(e) => setLink(e.target.value)}
          />
          <span className='form__input-error'></span>
        </label>
      </PopupWithForm>
    </div>
  );
};

export default AddPlacePopup;
