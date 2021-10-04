import { GET_DATA, LOG_IN, ADD_RECIPE, UPDATE_RECIPE_LIKES, UPDATE_USER_LIKES } from './types';

const initialState = {
    recipes: [],
    logged: null,
};

export const recipesReducer = (state = initialState, action) => {
    switch(action.type) {
    case GET_DATA:
        return { ...state, recipes: action.payload };
    case LOG_IN:
        return { ...state, logged: action.payload };
    case ADD_RECIPE:
        return { ...state, recipes: state.recipes.concat(action.payload) };
    case UPDATE_RECIPE_LIKES:
        return {
            ...state,
            recipes: state.recipes.map(recipe => recipe.id === action.payload.id ? action.payload : recipe),
        };
    case UPDATE_USER_LIKES:
        return {
            ...state,
            logged: { ...state.logged, liked: action.payload }
        };
    default:
        return state;
    }
};
