import { Route } from "react-router-dom";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ isLogged, email, onLogout }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  function onClick() {
    setMenuIsOpen(!menuIsOpen);
  }

  useEffect(() => {
    if (menuIsOpen) {
      setMenuIsOpen(false);
    }
  }, [isLogged]);

  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__logo"
          src={logo}
          alt="логотип Место Россия"
        ></img>
      </Link>
      <Route exact path="/">
        <nav
          className={`header__nav header__hidden-menu ${
            menuIsOpen ? "header__hidden-menu_active" : ""
          }`}
        >
          <p className="header__nav-element">{email}</p>
          <button
            className="header__nav-element header__nav-element_dark link"
            onClick={onLogout}
          >
            Выйти
          </button>
        </nav>
      </Route>
      <Route path="/sign-up">
        <nav className="header__nav">
          <Link to="/sign-in" className="header__nav-element link">
            Войти
          </Link>
        </nav>
      </Route>
      <Route path="/sign-in">
        <nav className="header__nav">
          <Link to="/sign-up" className="header__nav-element link">
            Регистрация
          </Link>
        </nav>
      </Route>

      {isLogged ? (
        <div
          className={`menu-button ${
            menuIsOpen ? "menu-button_close" : "menu-button_burger"
          }`}
          onClick={onClick}
        >
          <span class="menu-button__bar" />
          <span class="menu-button__bar" />
          <span class="menu-button__bar" />
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
