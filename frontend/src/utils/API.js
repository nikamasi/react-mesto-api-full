/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/

class API {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res, errorMessage) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(errorMessage);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers }).then((res) =>
      this._handleResponse(res, "Ошибка при получении карточек")
    );
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers }).then(
      (res) =>
        this._handleResponse(res, "Ошибка при получении данных пользователя.")
    );
  }

  saveUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) =>
      this._handleResponse(res, "Ошибка при сохранении данных пользователя.")
    );
  }

  saveImage(name, src) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: src,
      }),
    }).then((res) =>
      this._handleResponse(res, "Ошибка при сохранении данных изображения.")
    );
  }

  deleteImage(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) =>
      this._handleResponse(res, "Ошибка при удалении изображения.")
    );
  }

  changeLikeCardStatus(cardId, toLike, userId) {
    return toLike ? this._like(cardId, userId) : this._unlike(cardId, userId);
  }

  _like(id, user) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        likes: user,
      }),
    }).then((res) => this._handleResponse(res, "Ошибка при удалении лайка."));
  }

  _unlike(id, user) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        likes: user,
      }),
    }).then((res) => this._handleResponse(res, "Ошибка при отправке лайка."));
  }

  changeAvatar(link, user) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._handleResponse(res, "Ошибка при отправке ссылки."));
  }
}

export const api = new API({
  baseUrl: "https://api.angel.nomoredomains.icu",
  headers: "",
});
