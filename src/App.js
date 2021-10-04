import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getData, logIn} from './redux/actions';

import { Header } from './components/Header';
import { ListContainer } from './components/list/ListContainer';
import { RecipeContainer } from './components/recipe/RecipeContainer';
import { Authorization } from './components/Authorization';
import { Creation } from './components/recipe/Creation';
import { Footer } from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';

export function App() {

    const dispatch = useDispatch();

    function initializeList() {
        dispatch(getData())
            .catch(e => alert(e));
    }

    function checkAuthorizationAndLogIn() {
        const token = localStorage.getItem('authorized');
        const authorized = JSON.parse(token);
        if(authorized)
            dispatch(logIn(authorized.email, authorized.password))
                .catch(e => alert(e));
    }

    initializeList();
    checkAuthorizationAndLogIn();

    return (
        <>
            <Router>
                <Header />
                <main className="wrapper">
                    <Switch>
                        <Route exact path="/" component={ListContainer} />
                        <Route path="/recipe" component={RecipeContainer} />
                        <Route path="/authorization" component={Authorization} />
                        <Route path="/creation" component={Creation} />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </>
    );
}
