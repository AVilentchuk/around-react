import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEnlargeAvatarPopupOpen, setIsEnlargeAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [userData, setUserData] = React.useState({});

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEnlargeAvatarClick = (userData) => {
    setUserData(userData);
    setIsEnlargeAvatarPopupOpen(true);
  };
  const handleCardClick = (cardClicked) => {
    setSelectedCard(cardClicked);
    setIsImagePopupOpen(true);
  };
  const handleUpdateUserData = (data) => {
    setUserData(data);
  };

  const handleClose = () => {
    setIsImagePopupOpen(false);
    setIsEnlargeAvatarPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
  };

  return (
    <div className='page'>
      <div className='page__wrap'>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onEnlargeAvatarClick={handleEnlargeAvatarClick}
          onCardClick={handleCardClick}
          userInfo={userData}
          setUserData={handleUpdateUserData}
        />
        <Footer />
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={handleClose}
          windowId='w-edit'
          formHeader='Edit Profile'
          formName='editWindow'
        >
          <label htmlFor='name' className='form__field'>
            <input
              className='form__input'
              type='text'
              name='name'
              id='name'
              placeholder='Insert name here...'
              required
              minLength='2'
              maxLength='40'
            />
            <span className='form__input-error'></span>
          </label>
          <label htmlFor='about' className='form__field'>
            <input
              className='form__input'
              type='text'
              name='about'
              id='about'
              placeholder='Insert job here...'
              required
              minLength='2'
              maxLength='200'
            />
            <span className='form__input-error'></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isPlacePopupOpen}
          onClose={handleClose}
          windowId='w-add'
          formHeader='New place'
          formName='addWindow'
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
            />
            <span className='form__input-error'></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClose}
          windowId='w-editpic'
          formHeader='Change profile picture'
          formName='editprofpic'
        >
          <label htmlFor='pictureurl' className='form__field'>
            <input
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

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={handleClose}
          id='w-img'
          targetObj={selectedCard}
          navigation={true}
        />
        <ImagePopup
          isOpen={isEnlargeAvatarPopupOpen}
          onClose={handleClose}
          id='w-piclrg'
          targetObj={userData}
          navigation={false}
        />
      </div>
    </div>
  );
}

export default App;
