import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleCardName(e) {
    setName(e.target.value);
  }

  function handleCardLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="image"
      title="Новое место"
      buttonText="Создать"
    >
      <input
        name="update-image-name"
        type="text"
        id="cardname"
        className="popup__input popup__input_changed_image-name"
        required
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={name}
        onChange={handleCardName}
      />
      <span id="cardname-error" className="popup__error"></span>
      <input
        name="update-link"
        type="url"
        id="link"
        className="popup__input popup__input_changed_link"
        required
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleCardLink}
      />
      <span id="link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
