import React from "react";

const Card = (props) => {
  const ref = React.createRef();
  const [cardData, setCardData] = React.useState(props.cardData);
  const { name, likes, link, _id: id } = cardData;

  const [liked, setLiked] = React.useState(() =>
    likes.some((like) => like._id === props.userId)
  );
  const [isTooltip, setIsTooltip] = React.useState(false);
  React.useLayoutEffect(() => {
    ref.current.clientWidth < ref.current.scrollWidth && setIsTooltip(true);
  }, [ref]);

  const handleLikeClick = () => {
    props.onCardLike(id, liked).then((res) => setCardData(res));
    setLiked(!liked);
  };

  function handleClick() {
    return props.onClick(cardData);
  }

  return (
    <div>
      <div className='card'>
        {cardData.owner._id === props.userId && (
          <button className='button button_type_delete' type='click'></button>
        )}
        <img
          alt={name}
          src={link}
          className='card__image'
          onClick={handleClick}
        />
        <div className='card__footer'>
          <h2 ref={ref} className='card__text'>
            {name}
          </h2>
          <div className='card__likes-container'>
            <button
              className={`button card__like-button ${
                liked && "card__like-button_active"
              }`}
              id='likebtn'
              aria-label='heart icon (like)'
              onClick={handleLikeClick}
            ></button>
            <label
              className='card__like-label'
              htmlFor='likebtn'
              style={{ visibility: likes.length ? "visible" : "hidden" }}
            >
              {`${likes.length}`}
            </label>
          </div>
          {isTooltip && <div className='card__overflow-tooltip'>{name}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
