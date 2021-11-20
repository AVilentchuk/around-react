import { useEffect, useState, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  //isOpened
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEnlargeAvatarPopupOpen, setIsEnlargeAvatarPopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  //data holding states
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardsData, setCardsData] = useState([]);

  //function to add event listeners
  function useKey(key, callback, condition) {
    const callbackRef = useRef(callback);
    useEffect(() => {
      callbackRef.current = callback;
    });

    useEffect(() => {
      if (!condition) {
        return;
      }
      function handle(event) {
        if (event.code === key) {
          callbackRef.current(event);
        }
      }
      document.addEventListener("keydown", handle);
      return () => document.removeEventListener("keydown", handle);
    }, [key, condition]);
  }
  //<<START>>data fetching functions <<START>>
  const getUserInfo = async () => {
    try {
      const callData = await api.getProfile();
      callData && setCurrentUser(callData);
    } catch (error) {
      console.log(error);
    }
  };

  const getCards = async () => {
    try {
      const callData = await api.getInitialCards();
      callData && setCardsData(callData);
    } catch (error) {
      console.log(error);
    }
  };
  //<<END>>data fetching functions <<END>>
  //<<START>>Card actions handles<<START>>
  const handleCardLike = async (id, status) => {
    if (status)
      try {
        const result = await api
          .dislikePhoto(id)
          .then((newCardData) =>
            cardsData.map(
              (card) =>
                (card = newCardData._id === card._id ? newCardData : card)
            )
          );
        setCardsData(result);
      } catch (error) {
        console.log(error);
      }
    else
      try {
        const result = await api
          .likePhoto(id)
          .then((newCardData) =>
            cardsData.map(
              (card) =>
                (card = newCardData._id === card._id ? newCardData : card)
            )
          );
        setCardsData(result);
      } catch (error) {
        console.log(error);
      }
  };

  const handleDeleteCard = async () => {
    const id = selectedCard._id;
    try {
      await api.deleteCardPost(id);
      return setCardsData(cardsData.filter((card) => card._id !== id));
    } catch (error) {
      return Promise.reject(error)
    }
  };

  const handleAddCard = async (card) => {
    try {
      await api.postNewCard(card).then((res) =>
        setCardsData((Cards) => {
          return [res].concat(Cards)
        })).catch((error) => Promise.reject(error))
    } catch (error) {
      return Promise.reject(error)
    }
  };
  //<<END>>Card actions handles<<END>>
  //<<START>>Window openers & closers<<START>>
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
  const handleDeleteClick = (cardClicked) => {
    setSelectedCard(cardClicked);
    setIsConfirmPopupOpen(true);
  };

  // };
  const handleClose = () => {
    setIsImagePopupOpen(false);
    setIsEnlargeAvatarPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
  };
  //<<END>>Window openers & closers<<END>>
  //<<START>>Profile updating handlers<<START>>
  const handleUpdateUserData = async (data) => {
    try {
      return api
        .updateProfile(data)
        .then((res) => { setCurrentUser(res) })
        .catch((error) => Promise.reject(error));

    } catch (error) { return Promise.reject(error) }
  };

  const handleUpdateAvatarImage = async (data) => {
    try {
      return await api
        .updateProfilePhoto(data.avatar).then(res => { setCurrentUser(res) })
        .catch((error) => Promise.reject(error))

    } catch (error) { return Promise.reject(error) }
  };
  //<<END>>Profile updating handlers<<END>>
  //<<START>>Navigation handlers<<START>>
  const goLeft = () => {
    let index = cardsData.findIndex((item) => item === selectedCard);
    index =
      parseInt(index - 1) >= 0 ? parseInt(index - 1) : cardsData.length - 1;
    setSelectedCard(cardsData[index]);
  };
  const goRight = () => {
    let index = cardsData.findIndex((item) => item === selectedCard);
    index =
      parseInt(index + 1) <= cardsData.length - 1 ? parseInt(index + 1) : 0;
    setSelectedCard(cardsData[index]);
  };
  //<<END>>Navigation handlers<<END>>

  //initialization
  useEffect(() => {
    getCards();
    getUserInfo();
  }, []);

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
            setUserData={handleUpdateUserData}
            handleCardLike={handleCardLike}
            onDeleteClick={handleDeleteClick}
            cardsData={cardsData}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleClose}
            updateCurrentUser={handleUpdateUserData}
            useKey={useKey}
          />

          <AddPlacePopup
            isOpen={isPlacePopupOpen}
            onClose={handleClose}
            addNewCard={handleAddCard}
            useKey={useKey}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClose}
            updateCurrentUser={handleUpdateAvatarImage}
            useKey={useKey}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={handleClose}
            id='w-img'
            targetObj={selectedCard}
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
            goLeft={goLeft}
            goRight={goRight}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={handleClose}
            confirmDelete={handleDeleteCard}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
