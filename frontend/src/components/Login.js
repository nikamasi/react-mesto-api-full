import { useState } from "react";

function Login({ onSubmit }) {
  const [signInData, setSignInData] = useState({
    password: "",
    email: "",
  });

  function handleChange(e) {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(signInData).catch((err) => console.log(err));
  }

  return (
    <div className="auth">
      <h1 className="auth__header">Войти</h1>
      <form onSubmit={handleSubmit} className="auth__container">
        <input
          id="email"
          name="email"
          onChange={handleChange}
          value={signInData.email}
          type="email"
          className="auth__input"
          placeholder="Email"
        />
        <input
          id="password"
          name="password"
          onChange={handleChange}
          value={signInData.password}
          type="password"
          className="auth__input"
          placeholder="Пароль"
        />
        <button className="auth__button button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
