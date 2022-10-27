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
    return fetch(`${this._url}/cards`, { headers: {
      ...this._headers,
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    }, }).then((res) =>
      this._handleResponse(res, "Ошибка при получении карточек")
    ).then((res) => res);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: {
      ...this._headers,
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    }, }).then(
      (res) => this._handleResponse(res, "Ошибка при получении данных пользователя.")
    ).then((res) => res);
  }

  saveUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then((res) => this._handleResponse(res, "Ошибка при сохранении данных пользователя.")
    ).then((res) => res);
  }

  saveImage(name, src) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
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
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
    }).then((res) =>
      this._handleResponse(res, "Ошибка при удалении изображения.")
    );
  }

  changeLikeCardStatus(cardId, toLike) {
    return toLike ? this._like(cardId) : this._unlike(cardId);
  }

  _like(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      }
    })
    .then((res) => this._handleResponse(res, "Ошибка при отправке лайка"))
    .then((res) => res);
  }

  _unlike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      }
    })
    .then((res) => this._handleResponse(res, "Ошибка при отправке лайка"))
    .then((res) => res);
  }

  changeAvatar(link, user) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
    .then((res) => this._handleResponse(res, "Ошибка при отправке ссылки."))
    .then((res) => res);
  }
}

export const api = new API({
  baseUrl: "https://api.angel.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json"
  }
});
