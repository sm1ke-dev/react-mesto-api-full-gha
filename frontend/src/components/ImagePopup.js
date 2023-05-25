function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_section_card ${card.name ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button type="reset" className="popup__reset-button popup__reset-button_close_image-popups" onClick={onClose} aria-label="Закрытие попапа просмотра карточки"></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup