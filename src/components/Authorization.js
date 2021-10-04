import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/actions';
import '../styles/authorization.scss';

export function Authorization() {

    const dispatch = useDispatch();
    const history = useHistory();

    const whiteBg = 'white';
    const redBg = 'rgba(255, 0, 0, .2)';

    function changeHandler(input) {
        const currentInput = document.querySelector(`#authorization-${input}`);
        const text = currentInput.value.trim();
        currentInput.style.backgroundColor = text ? whiteBg : redBg;
        changeTextForWarningSpan('');
    }

    function authorize() {

        const email = document.querySelector('#authorization-email').value.trim();
        const password = document.querySelector('#authorization-password').value.trim();

        if(emailOrPasswordIsEmpty(email, password))
            return;

        dispatch(logIn(email, password))
            .then(success => success ? history.push('/') : showThatAccountDoesntExist())
            .catch(e => alert(e));
    }

    function emailOrPasswordIsEmpty(email, password) {
        let skip = false;
        if(!email) {
            changeBgColorForEmailInput(redBg);
            skip = true;
        }
        if(!password) {
            changeBgColorForPasswordInput(redBg);
            skip = true;
        }
        if(skip)
            changeTextForWarningSpan('Пустое поле');
        return skip;
    }

    function showThatAccountDoesntExist() {
        changeBgColorForEmailInput(redBg);
        changeBgColorForPasswordInput(redBg);
        changeTextForWarningSpan('Аккаунт не существует');
    }

    function changeBgColorForEmailInput(color) {
        const emailInput = document.querySelector('#authorization-email');
        emailInput.style.backgroundColor = color;
    }

    function changeBgColorForPasswordInput(color) {
        const passwordInput = document.querySelector('#authorization-password');
        passwordInput.style.backgroundColor = color;
    }

    function changeTextForWarningSpan(text) {
        const warningSpan = document.querySelector('#authorization-warning');
        warningSpan.textContent = text;
    }

    return(
        <section className="authorization">
            <div className="container w-25">
                <h2 className="heading">Войти в аккаунт</h2>
                <hr/>
                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="authorization-email">Email:</label>
                        <input type="email" className="form-control" id="authorization-email" onChange={() => changeHandler('email')}/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="authorization-password">Пароль:</label>
                        <input type="password" className="form-control" id="authorization-password" onChange={() => changeHandler('password')}/>
                    </div>
                    <div className="bottom d-flex justify-content-between align-items-center">
                        <span id="authorization-warning"></span>
                        <button type="button" className="btn btn-primary" onClick={authorize}>Войти</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
