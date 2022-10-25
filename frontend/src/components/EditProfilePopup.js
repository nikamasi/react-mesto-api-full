import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useForm } from "../hooks/useForm.js";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({ name: "", about: "" });

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [props.isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: values["name"],
      bio: values["about"],
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText={props.dataIsLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      dataIsLoading={props.dataIsLoading}
    >
      <input
        className="pop-up__input pop-up__input_name"
        type="text"
        id="name"
        name="name"
        minLength="2"
        maxLength="40"
        value={values["name"]}
        onChange={handleChange}
        required
      ></input>
      <span className="pop-up__error-message" id="name-error"></span>
      <input
        className="pop-up__input pop-up__input_bio"
        type="text"
        id="about"
        name="about"
        minLength="2"
        maxLength="200"
        value={values["about"]}
        onChange={handleChange}
        required
      ></input>
      <span className="pop-up__error-message" id="bio-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
