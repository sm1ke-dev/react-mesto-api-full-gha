import React from "react";
import "./FormAuth.css";

const FormAuth = ({
  title,
  buttonText,
  onSubmit,
  onChange,
  formValue,
  children,
}) => {
  return (
    <form className="popup__form popup__form_type_auth" onSubmit={onSubmit}>
      <h2 className="popup__title popup__title_type_auth">{title}</h2>
      <div>
        <input
          name="email"
          type="email"
          value={formValue.email}
          onChange={onChange}
          className="popup__input popup__input_type_auth"
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          value={formValue.password}
          onChange={onChange}
          className="popup__input popup__input_type_auth"
          placeholder="Пароль"
        />
      </div>
      <button
        type="submit"
        className="popup__submit-button popup__submit-button_type_auth"
      >
        {buttonText}
      </button>
      {children}
    </form>
  );
};

export default FormAuth;
