import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/actions';

export function Authorization() {

    const dispatch = useDispatch();
    const history = useHistory();
    const redBg = 'rgba(255, 0, 0, .2)';

    function changeHandler(input) {
        const currentInput = document.querySelector(`#authorization-${input}`);
        const text = currentInput.value.trim();
        currentInput.style.backgroundColor = !text ? redBg : 'white';
        const warning = document.querySelector('.authorization-bottom-warning');
        warning.textContent = '';
    }

    async function authorize() {

        const email = document.querySelector('#authorization-email');
        const password = document.querySelector('#authorization-password');
        const warning = document.querySelector('.authorization-bottom-warning');

        let skip = false;
        for(const input of [email, password]) {
            if(!input.value.trim()) {
                warning.textContent = 'Пустое поле';
                input.style.backgroundColor = redBg;
                skip = true;
            }
        }

        if(skip)
            return;

        let registered = null;
        const url = 'https://6139ffb61fcce10017e78cfb.mockapi.io/CookBook/users';

        let users;
        try {
            const response = await fetch(url);
            users = await response.json();
        } catch {
            alert('Нет соединения. Проверьте подключение к интернету.');
            return;
        }

        for(const user of users) {
            if(user.email === email.value.trim() && user.password === password.value.trim()) {
                registered = user;
                break;
            }
        }

        if(!registered) {
            warning.textContent = 'Аккаунт не существует';
            email.style.backgroundColor = redBg;
            password.style.backgroundColor = redBg;
            return;
        }
        
        email.style.backgroundColor = 'white';
        password.style.backgroundColor = 'white';
        dispatch(logIn(registered));
        history.push('/');
    }

    return(
        <section className="authorization">
            <div className="container w-25">
                <h2 className="authorization-header">Войти в аккаунт</h2>
                <hr/>
                <form className="authorization-form" onSubmit={e => e.preventDefault()}>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="authorization-email">Email:</label>
                        <input type="email" className="form-control" id="authorization-email" onChange={() => changeHandler('email')}/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="authorization-password">Пароль:</label>
                        <input type="password" className="form-control" id="authorization-password" onChange={() => changeHandler('password')}/>
                    </div>
                    <div className="authorization-bottom">
                        <span className="authorization-bottom-warning"></span>
                        <button type="button" className="btn btn-primary" onClick={authorize}>Войти</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
