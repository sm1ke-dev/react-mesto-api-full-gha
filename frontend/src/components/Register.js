import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FormAuth from "./FormAuth";

const Register = ({ setUrlPath, handleRegister }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setUrlPath("/sign-up");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(formValue.email, formValue.password, setFormValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <FormAuth
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      onChange={handleChange}
      formValue={formValue}
    >
      <p className="auth__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </FormAuth>
  );
};

export default Register;
