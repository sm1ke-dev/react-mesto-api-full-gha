function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}) {
  return (
    <section
      className={`popup popup_section_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className={`popup__container popup__container_section_${name}`}>
        <button
          type="reset"
          className="popup__reset-button popup__reset-button_close_main-popups"
          onClick={onClose}
          aria-label="Закрытие попапа"
        ></button>
        <h2 className={`popup__title popup__title_section_${name}`}>{title}</h2>
        <form
          name={`update-${name}`}
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`popup__submit-button popup__submit-button_section_${name}`}
          >
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
