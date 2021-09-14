import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getData } from './redux/actions';

import { Header } from './components/Header';
import { List } from './components/List';
import { Recipe } from './components/Recipe';
import { Authorization } from './components/Authorization';
import { Creation } from './components/Creation';
import { Footer } from './components/Footer';

export function App() {

    const dispatch = useDispatch();
    dispatch(getData());

    return (
        <>
            <Router>
                <Header />
                <main className="wrapper">
                    <Switch>
                        <Route exact path="/" component={List} />
                        <Route path="/recipe" component={Recipe} />
                        <Route path="/authorization" component={Authorization} />
                        <Route path="/creation" component={Creation} />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </>
    );
}
