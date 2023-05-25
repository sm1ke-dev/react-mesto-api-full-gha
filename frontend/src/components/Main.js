import { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    props.setUrlPath("/");
  }, []);

  return (
    <main className="content page__content">
      <section className="profile">
        <div
          className="profile__avatar-wrapper"
          onClick={props.onEditAvatar}
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
        >
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
            style={isMouseOver ? { opacity: 0.6 } : {}}
          />
          <span
            className={`profile__avatar-edit ${
              isMouseOver ? "profile__avatar-edit_shown" : ""
            }`}
          ></span>
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
              aria-label="Открытие попапа профиля"
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
          aria-label="Открытие попапа, добавляющего карточки"
        ></button>
      </section>

      <section className="elements content__elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              cardElement={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
