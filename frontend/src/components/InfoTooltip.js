import error from "../images/error.png";
import success from "../images/success.png";

function InfoTooltip(props) {
  return (
    <section className={`pop-up ${props.isOpen ? "pop-up_opened" : ""}`}>
      <div className="pop-up__container">
        <button
          type="button"
          className={`pop-up__close-button button`}
          onClick={props.onClose}
        ></button>
        <div className="pop-up__form">
          <img
            className="pop-up__logo"
            src={props.message.success ? success : error}
            alt={props.message.success ? "символ ок" : "символ ошибки"}
          ></img>
          <h3 className="pop-up__title pop-up__title_auth">
            {props.message.text}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
