import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  cardElement,
  onCardClick,
  onCardLike,
  setCards,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardElement.owner._id === currentUser._id;
  const isLiked = cardElement.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(cardElement);
  }

  function handleLikeClick() {
    onCardLike(cardElement);
  }

  function handleCardDelete() {
    onCardDelete(cardElement);
  }

  return (
    <li className="element elements__element">
      <button
        type="button"
        className={`element__trash-button ${
          isOwn && "element__trash-button_shown"
        }`}
        aria-label="Кнопка удаления карточки"
        onClick={handleCardDelete}
      ></button>
      <img
        src={cardElement.link}
        alt={cardElement.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__info-wrapper">
        <h2 className="element__name">{cardElement.name}</h2>
        <div className="element__like-wrapper">
          <button
            type="button"
            className={`element__like-button ${
              isLiked ? "element__like-button_is-active" : ""
            }`}
            aria-label="Кнопка лайка карточки"
            onClick={handleLikeClick}
          ></button>
          <p
            className={`element__likes-number ${
              cardElement.likes.length > 0 && "element__likes-number_shown"
            }`}
          >
            {cardElement.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
