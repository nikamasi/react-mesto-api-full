import PopupWithForm from "./PopupWithForm.js";

function ConfirmDeletePopup(props) {
  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    props.onConfirmCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-image"
      buttonText={props.dataIsLoading ? "Удаление..." : "Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleDeleteSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
