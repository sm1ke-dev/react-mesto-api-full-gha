import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRouteElement from "./ProtectedRoute";
import * as mestoAuth from "./mestoAuth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolkitOpen, setIsInfoToolkitOpen] = useState(false);
  const [isInfoToolkitSuccessful, setIsInfoToolkitSuccessful] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [urlPath, setUrlPath] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res.data)
        setCurrentUserEmail(res.data.email);
      })
      .catch((res) => console.log(res));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => setCards(res.data))
      .catch((res) => console.log(res));
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    if (localStorage.getItem("token")) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res.data)
          setCurrentUserEmail(res.data.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((res) => console.log(res));
    }
  }

  function handleLogin(email, password, setFormValue) {
    mestoAuth
      .authorize(email, password)
      .then((res) => {
        setFormValue({ email: "", password: "" });
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsInfoToolkitSuccessful(false);
        setIsInfoToolkitOpen(true);
        console.log(err);
      });
  }

  function handleRegister(email, password, setFormValue) {
    mestoAuth
      .register(email, password)
      .then((res) => {
        setIsInfoToolkitSuccessful(true);
        setIsInfoToolkitOpen(true);
        setFormValue({ email: "", password: "" });
      })
      .catch((err) => {
        setIsInfoToolkitSuccessful(false);
        setIsInfoToolkitOpen(true);
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((res) => console.log(res));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(setCards((state) => state.filter((el) => el._id !== card._id)))
      .catch((res) => console.log(res));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolkitOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then((newUser) => {
        setCurrentUser(newUser.data);
        closeAllPopups();
      })
      .catch((res) => console.log(res));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser.data);
        closeAllPopups();
      })
      .catch((res) => console.log(res));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((res) => console.log(res));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={isLoggedIn && currentUserEmail}
          text={`${
            isLoggedIn
              ? "Выйти"
              : urlPath === "/sign-in"
              ? "Регистрация"
              : urlPath === "/sign-up" && "Войти"
          }`}
          link={`${
            urlPath === "/sign-in"
              ? "/sign-up"
              : urlPath === "/sign-up"
              ? "/sign-in"
              : ""
          }`}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                setUrlPath={setUrlPath}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setUrlPath={setUrlPath}
                handleRegister={handleRegister}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login setUrlPath={setUrlPath} handleLogin={handleLogin} />
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <InfoTooltip
          isOpen={isInfoToolkitOpen}
          onClose={closeAllPopups}
          isSuccessful={isInfoToolkitSuccessful}
        />

        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
