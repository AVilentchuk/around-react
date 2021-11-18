import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import mainApi from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEnlargeAvatarPopupOpen, setIsEnlargeAvatarPopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardsData, setCardsData] = useState([]);
  // const [selectedSides, setSelectedSides] = useState([]);

  function useKey(key, callback) {
    const callbackRef = useRef(callback);
    useEffect(() => {
      callbackRef.current = callback;
    })

    useEffect(() => {

      function handle(event) {
        if (event.code === key) {
          callbackRef.current(event)
        }
      }
      document.addEventListener("keydown", handle);
      return () => document.removeEventListener("keydown", handle);
    }, [key])
  }

  const getUserInfo = async () => {
    try {
      const callData = await mainApi.getProfile();
      callData && setCurrentUser(callData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardLike = async (id, status) => {
    if (status)
      try {
        const result = await mainApi.dislikePhoto(id).then(newCardData => (cardsData.map((card) => card = newCardData._id === card._id ? newCardData : card)))
        setCardsData(result)
      }
      catch (error) { console.log(error) } else
      try {
        const result = await mainApi.likePhoto(id).then(newCardData => (cardsData.map((card) => card = newCardData._id === card._id ? newCardData : card)))
        setCardsData(result);
      }
      catch (error) { console.log(error) };
  };

  const handleDeleteCard = (id) => {
    try {
      mainApi.deleteCardPost(id).then(setCardsData(cardsData.filter(card => card._id !== id)))
    }
    catch (error) { console.log(error) }
  }


  const getCards = async () => {
    try {
      const callData = await mainApi.getInitialCards();
      callData && setCardsData(callData)
    }
    catch (error) { console.log("111", error) }
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEnlargeAvatarClick = (currentUser) => {
    setCurrentUser(currentUser);
    setIsEnlargeAvatarPopupOpen(true);
  };

  const handleCardClick = (cardClicked) => {
    setSelectedCard(cardClicked);
    setIsImagePopupOpen(true);
  };

  const handleUpdateUserData = (data) => {
    mainApi.updateProfile(data).then(setCurrentUser(data));
  };

  const handleUpdateAvatarImage = (data) => {
    mainApi.updateProfilePhoto(data.avatar).then(setCurrentUser(data));
  };

  const handleAddCard = async (card) => {
    try {
      const newCard = await mainApi.postNewCard(card)
      setCardsData(Cards => {
        return [newCard].concat(Cards)
      })
    }
    catch (error) { console.log(error) }
  }
  // const getTargetSiblings = () => {
  //   const index = cardsData.findIndex(item => item === selectedCard);
  //   const leftOfIndex = parseInt(index - 1) >= 0 ? parseInt(index - 1) : cardsData.length - 1;
  //   const rightOfIndex = parseInt(index + 1) <= cardsData.length - 1 ? parseInt(index + 1) : 0;
  //   console.log(index)
  //   setSelectedSides([cardsData[leftOfIndex], cardsData[rightOfIndex]]);

  // }

  const handleNavigationClick = (direction) => {
    let index = cardsData.findIndex(item => item === selectedCard);
    if (direction === 'left') {
      index = parseInt(index - 1) >= 0 ? parseInt(index - 1) : cardsData.length - 1;
    }
    if (direction === 'right') {
      index = parseInt(index + 1) <= cardsData.length - 1 ? parseInt(index + 1) : 0;
    }
    setSelectedCard(cardsData[index])
  }

  const goLeft = () => {
    let index = cardsData.findIndex(item => item === selectedCard);
    index = parseInt(index - 1) >= 0 ? parseInt(index - 1) : cardsData.length - 1;
    setSelectedCard(cardsData[index])
  }
  const goRight = () => {
    let index = cardsData.findIndex(item => item === selectedCard);
    index = parseInt(index + 1) <= cardsData.length - 1 ? parseInt(index + 1) : 0;
    setSelectedCard(cardsData[index])
  }



  const handleClose = () => {
    setIsImagePopupOpen(false);
    setIsEnlargeAvatarPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
  };
  useEffect(() => {
    getCards();
    getUserInfo()
  }, [])

  return (
    <div className='page'>
      <div className='page__wrap'>
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onEnlargeAvatarClick={handleEnlargeAvatarClick}
            onCardClick={handleCardClick}
            userInfo={currentUser}
            setUserData={handleUpdateUserData}
            handleCardLike={handleCardLike}
            handleDeleteCard={handleDeleteCard}
            cardsData={cardsData}



          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleClose}
            // currentUser={currentUser}
            updateCurrentUser={handleUpdateUserData}
          />
          {/* <PopupWithForm
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
          </PopupWithForm> */}
          <AddPlacePopup
            isOpen={isPlacePopupOpen}
            onClose={handleClose}
            addNewCard={handleAddCard}
          />

          {/* <PopupWithForm
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
          </PopupWithForm> */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClose}
            updateCurrentUser={handleUpdateAvatarImage}
          />
          {/* <PopupWithForm
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
          </PopupWithForm> */}

          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={handleClose}
            id='w-img'
            targetObj={selectedCard}
            navigationHandler={handleNavigationClick}
            navigation={true}
            useKey={useKey}
            goLeft={goLeft}
            goRight={goRight}
          />
          <ImagePopup
            isOpen={isEnlargeAvatarPopupOpen}
            onClose={handleClose}
            id='w-piclrg'
            targetObj={currentUser}
            navigation={false}
            useKey={useKey}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
