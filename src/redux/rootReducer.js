import { GET_DATA, LOG_IN, ADD_RECIPE, UPDATE_LIKES } from './types';

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
    case UPDATE_LIKES:
        const [ newUserLikes, idOfRecipe, add ] = action.payload;
        return {
            recipes: state.recipes.map(el =>
                el.id === idOfRecipe ? { ...el, likes: el.likes + add } : el
            ),
            logged: { ...state.logged, liked: newUserLikes }
        };
    default:
        return state;
    }
};
