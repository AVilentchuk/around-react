import React from "react";
import Card from "./Card";
import mainApi from "../utils/Api";
import profilePhoto from "../assets/images/avatar_photo.png";

const Main = (props) => {

  const [cardData, setCardData] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({});

  const getCards = async () => {
    const res = await mainApi.getInitialCards();
    return res;
  }

  const cardLike = async (id, status) => {
    const result =
      status ?
        await mainApi.dislikePhoto(id) :
        await mainApi.likePhoto(id);
    return result
  };

  React.useEffect(() => {
    getCards().then(res => {
      return setCardData(res)
    }).catch((error) => {
      setCardData();
      console.log(`${error}`);
    })

  }, []);
  React.useEffect(() => {
    mainApi.getProfile().then((res => setUserInfo(res))
    )
  }, []);

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
                onClick={props.onEditAvatarClick}
              ></button>
              <button className='button button_type_enlarge-profile-image'
                onClick={() => { props.onEnlargeAvatarClick(userInfo) }}></button>
            </div>
          </div>
          <div className='profile__description'>
            <h1 className='profile__name'>{userInfo ? userInfo.name : 'Kristine Weiss'}</h1>
            <button
              className='button profile__button-edit'
              type='button'
              aria-label='Edit profile'
              onClick={props.onEditProfileClick}
            ></button>
            <p className='profile__about'>
              {userInfo ? userInfo.about : 'Travel guide, food enthusiastic and culture lover'}
            </p>
          </div>
          <button
            className='button profile__button-add'
            type='button'
            aria-label='Add or create new profile'
            onClick={props.onAddPlaceClick}
          ></button>
        </section>

        <section className='locations'>
          {/* condition added to not crash react when the server is down */}
          {cardData && cardData.map((item) => {
            return (<Card
              onClick={props.onCardClick}
              cardData={item}
              userId={userInfo._id}
              onCardLike={cardLike}
              key={item._id}
            />);
          })}
        </section>
      </main>
    </div>
  );
};

export default Main;
