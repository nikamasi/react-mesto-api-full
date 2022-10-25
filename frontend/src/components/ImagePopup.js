function ImagePopup({ card, onClose, isOpen }) {
  return (
    <section
      className={`pop-up pop-up_image-view ${isOpen ? "pop-up_opened" : ""}`}
      aria-label="Просмотр фото"
    >
      <div className="image-view">
        <button
          type="button"
          className="pop-up__close-button button pop-up__close-button_image-view"
          onClick={onClose}
        ></button>
        <img
          className="image-view__image"
          alt="фото"
          src={isOpen ? card.link : "#"}
        ></img>
        <p className="image-view__name">{isOpen ? card.name : ""}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
