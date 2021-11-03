import React from "react";

const ImagePopup = (props) => {
  const { navigation, targetObj } = props;
  const { link, name, avatar } = targetObj;

  const navArray = [
    <div
      key={"leftNav"}
      className='navigation-arrow navigation-arrow_left'
    ></div>,
    <div
      key={"rightNav"}
      className='navigation-arrow navigation-arrow_right'
    ></div>,
  ];

  return (
    <div
      className={`popup popup_gallery ${props.isOpen ? "popup_active" : ""}`}
    >
      <div className='popup__gallery' id={"props.id"}>
        <button
          className='button button_type_close'
          type='button'
          aria-label='Close window'
          onClick={props.onClose}
        ></button>
        <img
          className='popup__img'
          src={link ? link : avatar ? avatar : ""}
          alt={name}
        />
        <h2 className='popup__place-name'>{name}</h2>
        {navigation && navArray}
      </div>
    </div>
  );
};

export default ImagePopup;
