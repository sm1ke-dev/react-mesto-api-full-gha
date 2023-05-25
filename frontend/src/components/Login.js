import { useEffect, useState } from "react";

import FormAuth from "./FormAuth";

const Login = ({ setUrlPath, handleLogin }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setUrlPath("/sign-in");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password, setFormValue);
  };

  return (
    <FormAuth
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
      onChange={handleChange}
      formValue={formValue}
    />
  );
};

export default Login;
