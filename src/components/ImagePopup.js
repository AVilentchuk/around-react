const ImagePopup = ({ navigation, targetObj, isOpen, onClose, id }) => {
  const { link, name, avatar } = targetObj;

  const navigationArrows = [
    <div
      key='leftNav'
      className='navigation-arrow navigation-arrow_left'
    ></div>,
    <div
      key='rightNav'
      className='navigation-arrow navigation-arrow_right'
    ></div>,
  ];

  return (
    <div
      className={`popup popup_gallery ${isOpen ? "popup_active" : ""}`}
      onClick={onClose}
    >
      <div
        className='popup__gallery'
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
        <img
          className='popup__img'
          src={link ? link : avatar ? avatar : ""}
          alt={name}
        />
        <h2 className='popup__place-name'>{name}</h2>
        {navigation && navigationArrows}
      </div>
    </div>
  );
};

export default ImagePopup;
