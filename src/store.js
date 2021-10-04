import { createStore, applyMiddleware } from 'redux';
import { recipesReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';

export const store = createStore(recipesReducer, applyMiddleware(thunk));
