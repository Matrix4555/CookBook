import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../Spinner';
import '../../styles/list.scss';

export function List({recipes, loading, setSort, goToRecipePage}) {

    function setDifficulty(value) {
        switch(value) {
        case 1:
            return 'легко';
        case 2:
            return 'средне';
        case 3:
            return 'трудно';
        }
    }

    function getSpanIfListIsEmpty() {
        return recipes.length ?
            null :
            <div className="d-flex justify-content-center">
                <span>Нет подходящих рецептов</span>
            </div>;
    }

    return(
        <section className="list">
            <table className="table table-bordered">
                <thead>
                    <tr className="heading bg-primary text-white" onClick={setSort}>
                        <th className="number">№</th>
                        <th className="title">Название</th>
                        <th className="ingredients">Ингредиенты</th>
                        <th className="difficulty">Сложность</th>
                        <th className="likes">Лайки</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recipes.map(recipe => 
                            <tr className="item" key={recipe.id} onClick={() => goToRecipePage(recipe)}>
                                <td>{recipe.id}</td>
                                <td className="title">{recipe.title}</td>
                                <td className="ingredients">
                                    <ul>
                                        {
                                            recipe.ingredients.split('\n').map((el, ind) => el.includes(':') ?
                                                <li className="heading_li" key={ind}><span>{el}</span></li> :
                                                <li key={ind}>{el}</li>)
                                        }
                                    </ul>
                                </td>
                                <td>{setDifficulty(recipe.difficulty)}</td>
                                <td>{recipe.likes}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {
                loading ?
                    <Spinner /> :
                    getSpanIfListIsEmpty()
            }
        </section>
    );
}

List.propTypes = {
    recipes: PropTypes.array,
    loading: PropTypes.bool,
    setSort: PropTypes.func,
    goToRecipePage: PropTypes.func
};
