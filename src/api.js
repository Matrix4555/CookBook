const URL = 'https://6139ffb61fcce10017e78cfb.mockapi.io/CookBook';

export const ERROR_MESSAGE = 'Произошла ошибка отправки запроса';

export function sendRequest(subUrl, method = 'GET', body = null) {
    return fetch(`${URL}/${subUrl}`, {
        method,
        headers: {'Content-type': 'application/json'},
        body: body ? JSON.stringify(body) : null
    });
}
