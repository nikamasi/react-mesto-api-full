import { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import { api } from "../utils/API.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    _id: "",
    avatar: "",
    about: "",
  });
  const [email, setEmail] = useState("");
  const [dataIsLoading, setDataIsLoading] = useState();
  const [cards, setCards] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState({
    success: true,
    text: "",
  });

  const history = useHistory();

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, currentUser._id)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setIsInfoTooltipOpen(false);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    cardToDelete ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleCardDeleteClick(card) {
    setCardToDelete(card);
    setIsDeletePopupOpen(true);
  }

  function handleCardDelete() {
    setDataIsLoading(true);
    api
      .deleteImage(cardToDelete._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setDataIsLoading(false);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, bio }) {
    setDataIsLoading(true);
    api
      .saveUserInfo(name, bio)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setDataIsLoading(false);
      });
  }

  function handleUpdateAvatar(link) {
    setDataIsLoading(true);
    api
      .changeAvatar(link, currentUser)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setDataIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    setDataIsLoading(true);
    api
      .saveImage(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setDataIsLoading(false);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setEmail(data.data.email);
        setIsLogged(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (isLogged) {
      history.push("/");
    }
  }, [isLogged, history]);

  function handleSignIn(data) {
    return auth
      .signIn(data)
      .then((res) => {
        setIsLogged(true);
        setEmail(data.email);
        localStorage.setItem("jwt", res.token);
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipMessage({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          success: false,
        });
      });
  }

  function handleSignUp(data) {
    return auth
      .signUp(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipMessage({
          text: "Вы успешно зарегистрировались",
          success: true,
        });
      })
      .then(() => history.push("/sign-in"))
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipMessage({
          success: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleLogout() {
    setIsLogged(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLogged={isLogged} email={email} onLogout={handleLogout} />
      <Switch>
        <Route path="/sign-in">
          {isLogged ? <Redirect to="/" /> : <Login onSubmit={handleSignIn} />}
        </Route>
        <Route path="/sign-up">
          {isLogged ? (
            <Redirect to="/" />
          ) : (
            <Register onSubmit={handleSignUp} />
          )}
        </Route>
        <ProtectedRoute
          path="/"
          isLogged={isLogged}
          component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleCardDeleteClick}
        ></ProtectedRoute>
        <Route path="*">
          {isLogged ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        dataIsLoading={dataIsLoading}
      ></EditProfilePopup>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        dataIsLoading={dataIsLoading}
      ></EditAvatarPopup>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        dataIsLoading={dataIsLoading}
      ></AddPlacePopup>

      <ConfirmDeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onConfirmCardDelete={handleCardDelete}
        dataIsLoading={dataIsLoading}
      ></ConfirmDeletePopup>

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      ></ImagePopup>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        message={infoTooltipMessage}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
