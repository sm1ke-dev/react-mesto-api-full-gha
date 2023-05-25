import React from "react";

import "./InfoTooltip.css";

const InfoTooltip = ({ isOpen, onClose, isSuccessful }) => {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="reset"
          className="popup__reset-button popup__reset-button_close_main-popups"
          onClick={onClose}
          aria-label="Закрытие попапа"
        ></button>
        <div
          className={`info__icon ${isSuccessful ? "" : "info__icon_error"}`}
        ></div>
        <h3 className="info__text">
          {isSuccessful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </section>
  );
};

export default InfoTooltip;
