import React from 'react';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/header.scss';

import logo from '../img/logo.png';

export function Header() {

    const history = useHistory();
    const logged = useSelector(state => state.logged);

    function blockCreationBtnAndMakeHint() {
        const creationDiv = document.querySelector('#creation_btn');
        const creationBtn = document.querySelector('#creation_btn > button');
        creationDiv.setAttribute('data-tooltip', 'Вам нужно войти в аккаунт');
        creationBtn.setAttribute('disabled', '');
    }

    function unblockCreationBtnAndRemoveHint() {
        const creationDiv = document.querySelector('#creation_btn');
        const creationBtn = document.querySelector('#creation_btn > button');
        creationDiv.removeAttribute('data-tooltip');
        creationBtn.removeAttribute('disabled');
    }

    useEffect(() => {
        logged ?
            unblockCreationBtnAndRemoveHint() :
            blockCreationBtnAndMakeHint();
    });

    return(
        <header className="header wrapper d-flex justify-content-between align-items-center py-3 mb-5 border-bottom">
            <div className="d-flex align-items-center">
                <Link to="/">
                    <img src={logo} alt="CookBook"/>
                </Link>
                <button className="btn btn-primary" onClick={() => history.push('/')}>Список рецептов</button>
                <div id="creation_btn">
                    <button className="btn btn-primary" onClick={() => history.push('/creation')}>Создать рецепт</button>
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
