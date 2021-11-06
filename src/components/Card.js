import React from "react";

const Card = ({ cardData, onClick, onCardLike, userId }) => {
  const tooltip = React.createRef();
  const { name, likes, link, _id: id } = cardData;
  const liked = likes.some((like) => like._id === userId);

  //I have no idea how to conditionally render the tooltip without using a useState , would love to hear suggestions
  //After consulting with the educational team they said it was implemented correctly, and didn't give me any ideas.
  const [isTooltip, setIsTooltip] = React.useState(false);

  React.useEffect(() => {
    setIsTooltip(tooltip.current.clientWidth < tooltip.current.scrollWidth);
  }, [tooltip]);

  const handleLikeClick = () => onCardLike(id, liked);

  function handleClick() {
    return onClick(cardData);
  }

  return (
    <div>
      <div className='card'>
        {cardData.owner._id === userId && (
          <button className='button button_type_delete' type='click'></button>
        )}
        <img
          alt={name}
          src={link}
          className='card__image'
          onClick={handleClick}
        />
        <div className='card__footer'>
          <h2 ref={tooltip} className='card__text'>
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
