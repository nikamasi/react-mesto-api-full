import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onSubmit }) {
  const [signUpData, setSignUpData] = useState({
    password: "",
    email: "",
  });

  function handleChange(e) {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(signUpData);
  }

  return (
    <div className="auth">
      <h1 className="auth__header">Регистрация</h1>
      <form onSubmit={handleSubmit} className="auth__container">
        <input
          id="email"
          name="email"
          onChange={handleChange}
          type="email"
          value={signUpData.email}
          className="auth__input"
          placeholder="Email"
        ></input>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          type="password"
          value={signUpData.password}
          className="auth__input"
          placeholder="Пароль"
        ></input>
        <button className="auth__button button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/signin" className="auth__link link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
