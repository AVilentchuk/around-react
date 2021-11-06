import { useEffect, useState } from "react";
import Card from "./Card";
import mainApi from "../utils/Api";
import profilePhoto from "../assets/images/avatar_photo.png";

const Main = ({ setUserData, userInfo, onEditProfileClick, onAddPlaceClick, onEditAvatarClick, onEnlargeAvatarClick, onCardClick }) => {
  //States
  const [cardsData, setCardsData] = useState([]);
  //<<START>> ASync functions <<START>>
  const getCards = async () => {
    try {
      const callData = await mainApi.getInitialCards();
      setCardsData(callData)
    }
    catch (error) { console.log(error) }
  }

  const getUserInfo = async () => {
    try {
      const callData = await mainApi.getProfile()
      setUserData(callData);
    } catch (error) { console.log(error) }
  }

  const likeCard = async (id, status) => {
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
  //<<END>> ASync functions <<END>>

  //initialization
  useEffect(() => {
    getCards();
    getUserInfo();
  }, []);

  //RenderCards function.
  const renderCard = (item) =>
  (<Card
    onClick={onCardClick}
    cardData={item}
    userId={userInfo._id}
    onCardLike={likeCard}
    key={item._id}
  />)

  return (
    <div>
      <main>
        <section className='profile'>
          <div className='profile__photo-container'>
            <img
              className='profile__photo'
              src={userInfo ? userInfo.avatar : profilePhoto}
              alt={userInfo ? `Photo of ${userInfo.name}` : 'Photo of Kristine Weiss'}
            />
            <div className='profile__photo-buttons'>
              <button
                className='button button_type_edit-profile-image'
                onClick={onEditAvatarClick}
              ></button>
              <button className='button button_type_enlarge-profile-image'
                onClick={() => { onEnlargeAvatarClick(userInfo) }}></button>
            </div>
          </div>
          <div className='profile__description'>
            <h1 className='profile__name'>{userInfo ? userInfo.name : 'Kristine Weiss'}</h1>
            <button
              className='button profile__button-edit'
              type='button'
              aria-label='Edit profile'
              onClick={onEditProfileClick}
            ></button>
            <p className='profile__about'>
              {userInfo ? userInfo.about : 'Travel guide, food enthusiastic and culture lover'}
            </p>
          </div>
          <button
            className='button profile__button-add'
            type='button'
            aria-label='Add or create new profile'
            onClick={onAddPlaceClick}
          ></button>
        </section>

        <section className='locations'>
          {cardsData.map(card => renderCard(card))}
        </section>
      </main>
    </div>
  );
};

export default Main;
