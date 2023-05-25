import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <input
        name="update-link"
        type="url"
        id="avatarLink"
        className="popup__input popup__input_changed_link"
        required
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span id="avatarLink-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
