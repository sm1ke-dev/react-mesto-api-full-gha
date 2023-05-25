import { useState } from "react";

import "./Header.css";

import logo from "../images/Vector.svg";
import { Link } from "react-router-dom";

function Header({ email, text, link, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function signOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu_opened" : ""}`}>
        <p className="mobile-menu__email">{email}</p>
        <a href="#" className="mobile-menu__exit" onClick={signOut}>
          {email && text}
        </a>
      </div>
      <header className="header page__header">
        <img src={logo} alt="Лого" className="header__logo" />
        {email ? (
          <>
            <nav className="header__list">
              <p className="header__nav header__email">{email}</p>
              <a
                href="#"
                className="header__nav header__exit"
                onClick={signOut}
              >
                {text}
              </a>
            </nav>
            <div
              className={`header__menu ${
                isMenuOpen ? "header__menu_opened" : ""
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            ></div>
          </>
        ) : (
          <Link to={link} className="header__nav">
            {text}
          </Link>
        )}
      </header>
    </>
  );
}

export default Header;
