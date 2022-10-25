function PopupWithForm(props) {
  return (
    <section
      className={`pop-up pop-up_${props.name} ${
        props.isOpen ? "pop-up_opened" : ""
      }`}
    >
      <div className="pop-up__container">
        <button
          type="button"
          className={`pop-up__close-button button pop-up__close-button_${props.name}`}
          onClick={props.onClose}
        ></button>
        <div className={`pop-up__form pop-up__form_${props.name}`}>
          <h3 className="pop-up__title">{props.title}</h3>
          <form
            name={props.name}
            className={`${props.name} form`}
            noValidate
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button className="pop-up__save-button button" type="submit">
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
