import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLikes } from '../redux/actions';
import PropTypes from 'prop-types';

import unlikedSign from '../img/like.png';
import likedSign from '../img/liked.png';

export function Recipe(props) {

    const dispatch = useDispatch();
    const logged = useSelector(state => state.logged);
    const history = useHistory();
    const recipe = props.history.location.state.data;

    useEffect(() => {
        window.scrollTo(0, 0);
        if(!logged) {
            const likesDiv = document.querySelector('.recipe-header-likes');
            likesDiv.setAttribute('data-tooltip', 'Вам нужно войти в аккаунт');
        } else if(logged.liked.includes(recipe.id)) {
            const likeBtnImg = document.querySelector('.recipe-header-likes-btn-img');
            likeBtnImg.src = likedSign;
        }
    });

    setTimeout(() => {
        const levels = document.querySelectorAll('.recipe-difficulty-level');
        for(let i = 0; i < recipe.difficulty; i++)
            levels[i].className += ' filled-level';
    }, 0);

    function like() {
        if(!logged)
            return;

        const likeBtnImg = document.querySelector('.recipe-header-likes-btn-img');
        const numberSpan = document.querySelector('.recipe-header-likes-number');

        const hasLiked = logged.liked.includes(recipe.id);
        const add = hasLiked ? -1 : 1;

        likeBtnImg.src = hasLiked ? unlikedSign : likedSign;
        numberSpan.textContent = (+numberSpan.textContent) + add;

        dispatch(updateLikes(recipe.id, add))
            // if the connection is lost, then need to return the previous like sign and number
            .catch(() => {
                likeBtnImg.src = hasLiked ? likedSign : unlikedSign;        // return the sign
                numberSpan.textContent = (+numberSpan.textContent) - add;   // return the number
            });
    }

    return (
        <section className="recipe">
            <div className="container w-50">
                <div className="recipe-header">
                    <h2 className="recipe-header-title">{recipe.title}</h2>
                    <div className="recipe-header-likes">
                        <button className="recipe-header-likes-btn" onClick={like}>
                            <img className="recipe-header-likes-btn-img" src={unlikedSign} alt="like"/>
                        </button>
                        <span className="recipe-header-likes-number">{recipe.likes}</span>
                    </div>
                </div>
                <hr/>
                {
                    recipe.image ?
                        <div className="recipe-img">
                            <img className="recipe-img-thumb" src={recipe.image} alt={recipe.title}/>
                        </div> :
                        null
                }
                <div className="recipe-difficulty">
                    <span>Сложность:</span>
                    <div className="recipe-difficulty-level empty-level"></div>
                    <div className="recipe-difficulty-level empty-level"></div>
                    <div className="recipe-difficulty-level empty-level"></div>
                </div>
                {
                    recipe.description ?
                        <div className="recipe-info">
                            <h4>Описание</h4>
                            <p>{recipe.description}</p>
                        </div> :
                        null
                }
                <div className="recipe-info">
                    <h4>Ингредиенты</h4>
                    <ul>
                        {recipe.ingredients.split('\n').map(el => el.includes(':') ?
                            <span className="recipe-info-heading">{el}<br/></span> :
                            <li>{el}</li>
                        )}
                    </ul>
                </div>
                <div className="recipe-info">
                    <h4>Этапы приготовления</h4>
                    <p>
                        {recipe.cooking.split('\n').map(el => el.includes('Шаг') ?
                            <span className="recipe-info-heading">{el}<br/></span> :
                            <>{el}<br/></>
                        )}
                    </p>
                </div>
                <div className="recipe-bottom page-bottom">
                    <button className="btn btn-primary" onClick={() => history.push('/')}>Вернуться к списку</button>
                </div>
            </div>
        </section>
    );
}

Recipe.propTypes = {
    history: PropTypes.object
};
