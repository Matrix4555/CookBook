import { GET_DATA, LOG_IN, ADD_RECIPE, UPDATE_LIKES } from './types';

const url = 'https://6139ffb61fcce10017e78cfb.mockapi.io/CookBook';

export function getData() {
    return async dispatch => {
        let recipes;
        try {
            const response = await fetch(`${url}/recipes`);
            recipes = await response.json();
        } catch {
            alert('Нет соединения. Проверьте подключение к интернету.');
            return;
        }
        dispatch({
            type: GET_DATA,
            payload: recipes
        });
    };
}

export function logIn(user) {
    return {
        type: LOG_IN,
        payload: user
    };
}

export function addRecipe(recipe) {
    return async dispatch => {
        const recipeWithoutImg = { ...recipe, image: '' };
        return new Promise(res => {
            sendRequest('recipes', 'POST', recipeWithoutImg)
                .then(() => {
                    res();
                    dispatch({
                        type: ADD_RECIPE,
                        payload: recipe
                    });
                })
                .catch(() => {
                    alert('Нет соединения. Проверьте подключение к интернету.');
                });
        });
    };
}

export function updateLikes(idOfRecipe, add) {
    return async (dispatch, getState) => {

        const { logged } = getState();
        const recipe = getState().recipes[idOfRecipe - 1];

        const newUserLikes = logged.liked.slice();
        if(add === 1) {     // if i liked (+1)
            newUserLikes.push(recipe.id);
        } else {            // if i disliked (-1)
            const index = newUserLikes.findIndex(el => el === recipe.id);
            newUserLikes.splice(index, 1);
        }

        const updatedLikesOfRecipe = { likes: recipe.likes + add };
        const updatedLikesOfUser = { liked: newUserLikes };

        return new Promise((res, rej) => {
            Promise.all([
                sendRequest(`recipes/${recipe.id}`, 'PUT', updatedLikesOfRecipe),
                sendRequest(`users/${logged.id}`, 'PUT', updatedLikesOfUser)
            ])
                .then(() => {
                    dispatch({
                        type: UPDATE_LIKES,
                        payload: [newUserLikes, recipe.id, add]
                    });
                })
                .catch(() => {
                    alert('Нет соединения. Проверьте подключение к интернету.');
                    rej();
                });
        });
    };
}

async function sendRequest(subUrl, method, body) {
    return await fetch(`${url}/${subUrl}`, {
        method,
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body)
    });
}
