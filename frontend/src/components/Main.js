import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  const cards = props.cards.map((card) => {
    return (
      <Card
        card={card}
        key={card._id}
        onCardClick={props.onCardClick}
        onCardLike={props.onCardLike}
        onCardDeleteClick={props.onCardDeleteClick}
      ></Card>
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__details">
          <div className="profile__pic-element">
            <img
              className="profile__pic"
              src={currentUser.avatar}
              alt="фото профиля"
            ></img>
            <button
              type="button"
              className="profile__pic-edit-button button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__bio">{currentUser.about}</p>
          <button
            type="button"
            className="profile__edit-button button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="gallery" aria-label="Фото галерея">
        {cards}
      </section>
    </main>
  );
}

export default Main;
