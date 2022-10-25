import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const card = props.card;

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `gallery__item-remove-button button ${
    isOwn ? "gallery__item-remove-button_active" : ""
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `gallery__like-button ${
    isLiked ? "gallery__like-button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    if (isOwn) {
      props.onCardDeleteClick(card);
    }
  }

  return (
    <div className="gallery__item">
      <img
        className="gallery__image"
        src={card.link}
        alt="фото"
        onClick={handleClick}
      ></img>
      <div
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></div>
      <div className="gallery__caption">
        <h2 className="gallery__item-name">{card.name}</h2>
        <div className="gallery__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="gallery__like-number">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
