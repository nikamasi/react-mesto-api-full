import { useEffect } from "react";
import { useForm } from "../hooks/useForm.js";

import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const {values, handleChange, setValues} = useForm({"image-name": "", "image-link": ""})

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(values["image-name"], values["image-link"]);
  }

  useEffect(() => {
    setValues({"image-name": "", "image-link": ""})
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-image"
      buttonText={props.dataIsLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      dataIsLoading={props.dataIsLoading}
    >
      <input
        className="pop-up__input pop-up__input_image-name"
        type="text"
        id="image-name"
        name="image-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values["image-name"]}
        onChange={handleChange}
        required
      ></input>
      <span className="pop-up__error-message" id="image-name-error"></span>
      <input
        className="pop-up__input pop-up__input_image-link"
        type="url"
        id="image-link"
        name="image-link"
        placeholder="Ссылка на картинку"
        value={values["image-link"]}
        onChange={handleChange}
        required
      ></input>
      <span className="pop-up__error-message" id="image-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
