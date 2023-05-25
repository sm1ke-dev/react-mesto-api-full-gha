import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="info"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <input
        name="update-name"
        type="text"
        id="username"
        className="popup__input popup__input_changed_name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span id="username-error" className="popup__error"></span>
      <input
        name="update-job"
        type="text"
        id="about"
        className="popup__input popup__input_changed_job"
        required
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span id="about-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
