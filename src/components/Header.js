import React from 'react';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../img/logo.png';

export function Header() {

    const history = useHistory();
    const logged = useSelector(state => state.logged);

    useEffect(() => {
        const creationDiv = document.querySelector('.header-left-creation');
        const creationBtn = document.querySelector('.header-left-creation-btn');
        if(!logged) {
            creationDiv.setAttribute('data-tooltip', 'Вам нужно войти в аккаунт');
            creationBtn.setAttribute('disabled', '');
        } 
        else {
            creationDiv.removeAttribute('data-tooltip');
            creationBtn.removeAttribute('disabled');
        }
    });

    return(
        <header className="header wrapper d-flex justify-content-between align-items-center py-3 mb-5 border-bottom">
            <div className="header-left">
                <Link to="/">
                    <img className="header-logo" src={logo} alt="CookBook"/>
                </Link>
                <button className="btn btn-primary" onClick={() => history.push('/')}>Список рецептов</button>
                <div className="header-left-creation">
                    <button className="header-left-creation-btn btn btn-primary" onClick={() => history.push('/creation')}>Создать рецепт</button>
                </div>
            </div>
            {
                logged ?
                    <span>Вы вошли как {logged.nickname}</span> :
                    <button className="btn btn-primary" onClick={() => history.push('/authorization')}>Войти в аккаунт</button>
            }
        </header>
    );
}
