const BASE_URL = "https://auth.nomoreparties.co";
const headers = {
  "Content-Type": "application/json",
};

function _handleResponse(res, errorMessage) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`${errorMessage}: ${res.status} - ${res.statusText}`);
  }
}

export function signIn({ password, email }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ password, email }),
  }).then((res) => _handleResponse(res, "Ошибка при входе"));
}

export function signUp({ password, email }) {
  console.log(password, email);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ password, email }),
  }).then((res) => _handleResponse(res, "Ошибка при регистрации"));
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then((res) =>
    _handleResponse(res, "Ошибка при получении данных пользователя по токену")
  );
}
