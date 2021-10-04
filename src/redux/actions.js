import { GET_DATA, LOG_IN, ADD_RECIPE, UPDATE_RECIPE_LIKES, UPDATE_USER_LIKES } from './types';
import { sendRequest, ERROR_MESSAGE } from '../api';

export function getData() {
    return dispatch => {
        return new Promise((res, disconnection) => {
            sendRequest('recipes')
                .then(async response => {
                    const recipes = await response.json();
                    dispatch({
                        type: GET_DATA,
                        payload: recipes
                    });
                })
                .catch(() => disconnection(ERROR_MESSAGE));
        });
    };
}

export function logIn(email, password) {
    return dispatch => {
        return new Promise((userExists, disconnection) => {
            sendRequest('users')
                .then(async response => {
                    const registeredUsers = await response.json();
                    const user = checkAndGetUser(registeredUsers, email, password);
                    if(user) {
                        saveUserToLocalStorage(user);
                        dispatch({
                            type: LOG_IN,
                            payload: user
                        });
                    }
                    userExists(!!user);
                })
                .catch(() => disconnection(ERROR_MESSAGE));
        });
    };
}

function checkAndGetUser(users, email, password) {
    for(const user of users)
        if(user.email === email && user.password === password)
            return user;
}

function saveUserToLocalStorage(user) {
    const email = user.email;
    const password = user.password;
    const token = JSON.stringify({ email, password });
    localStorage.setItem('authorized', token);
}

export function addRecipe(recipe) {
    return dispatch => {
        const recipeWithoutImg = { ...recipe, image: '' };
        return new Promise((goToMainPage, disconnection) => {
            sendRequest('recipes', 'POST', recipeWithoutImg)
                .then(() => {
                    dispatch({
                        type: ADD_RECIPE,
                        payload: recipe
                    });
                    goToMainPage();
                })
                .catch(() => disconnection(ERROR_MESSAGE));
        });
    };
}

export function updateLikes(recipe, add) {
    return (dispatch, getState) => {

        const { logged } = getState();
        
        const updatedRecipeLikes = recipe.likes + add;
        const updatedUserLikes = getUpdatedUserLikes(logged, recipe.id);

        return new Promise((res, disconnection) => {
            Promise.all([
                sendRequest(`recipes/${recipe.id}`, 'PUT', { likes: updatedRecipeLikes }),
                sendRequest(`users/${logged.id}`, 'PUT', { liked: updatedUserLikes })
            ])
                .then(() => {
                    const recipeWithUpdatedLikes = { ...recipe, likes: updatedRecipeLikes };
                    dispatch({
                        type: UPDATE_RECIPE_LIKES,
                        payload: recipeWithUpdatedLikes
                    });
                    dispatch({
                        type: UPDATE_USER_LIKES,
                        payload: updatedUserLikes
                    });
                })
                .catch(() => disconnection(ERROR_MESSAGE));
        });
    };
}

function getUpdatedUserLikes(user, idOfRecipe) {
    const userLikes = user.liked.slice();
    userLikes.includes(idOfRecipe) ?
        userLikes.splice(userLikes.indexOf(idOfRecipe), 1) :
        userLikes.push(idOfRecipe);
    return userLikes;
}
