import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-pic"
      buttonText={props.dataIsLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      dataIsLoading={props.dataIsLoading}
    >
      <input
        className="pop-up__input pop-up__input_change-pic-link"
        type="url"
        id="change-pic-link"
        name="change-pic-link"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      ></input>
      <span className="pop-up__error-message" id="change-pic-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
