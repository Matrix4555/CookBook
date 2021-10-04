import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/recipe.scss';

import unlikedSign from '../../img/like.png';
import likedSign from '../../img/liked.png';

export function Recipe({recipe, likes, isLiked, toLike, goToMainPage}) {
    return(
        <section className="recipe">
            <div className="container w-50">
                <div className="heading d-flex justify-content-between">
                    <h2>{recipe.title}</h2>
                    <div className="d-flex align-items-center" id="likes_div">
                        <button onClick={toLike}>
                            <img src={isLiked ? likedSign : unlikedSign} alt="like"/>
                        </button>
                        <span>{likes}</span>
                    </div>
                </div>
                <hr/>
                {
                    recipe.image ?
                        <div className="img">
                            <img src={recipe.image} alt={recipe.title}/>
                        </div> :
                        null
                }
                <div className="difficulty d-flex flex-end justify-content-end">
                    <span>Сложность:</span>
                    <div className="level empty-level"></div>
                    <div className="level empty-level"></div>
                    <div className="level empty-level"></div>
                </div>
                {
                    recipe.description ?
                        <div className="info">
                            <h4>Описание</h4>
                            <p>{recipe.description}</p>
                        </div> :
                        null
                }
                <div className="info">
                    <h4>Ингредиенты</h4>
                    <ul>
                        {
                            recipe.ingredients.split('\n').map((el, ind) => el.includes(':') ?
                                <li className="heading_li" key={ind}><span>{el}</span></li> :
                                <li key={ind}>{el}</li>)
                        }
                    </ul>
                </div>
                <div className="info">
                    <h4>Этапы приготовления</h4>
                    <ul>
                        {recipe.cooking.split('\n').map((el, ind) => el.includes('Шаг') ? null : <li key={ind}>{el}</li>)}
                    </ul>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={goToMainPage}>Вернуться к списку</button>
                </div>
            </div>
        </section>
    );
}

Recipe.propTypes = {
    recipe: PropTypes.object,
    likes: PropTypes.number,
    isLiked: PropTypes.bool,
    toLike: PropTypes.func,
    goToMainPage: PropTypes.func
};
