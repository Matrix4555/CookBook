import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../../redux/actions';

export function Creation() {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const logged = useSelector(state => state.logged);
    const history = useHistory();

    const whiteBg = 'white';
    const redBg = 'rgba(255, 0, 0, .2)';

    function changeHandler(input) {
        const currentInput = document.querySelector(`#creation-${input}`);
        const text = currentInput.value.trim();
        currentInput.style.backgroundColor = text ? whiteBg : redBg;
    }

    function create() {

        if(requiredInputIsEmpty())
            return;

        const recipe = makeObjectOfNewRecipe();

        dispatch(addRecipe(recipe))
            .then(() => history.push('/'))
            .catch(e => alert(e));
    }
    
    function requiredInputIsEmpty() {
        
        const title =       document.querySelector('#creation-title');
        const ingredients = document.querySelector('#creation-ingredients');
        const cooking =     document.querySelector('#creation-cooking');
        const difficulty =  document.querySelector('#creation-difficulty');

        let skip = false;
        for(const input of [title, ingredients, cooking, difficulty]) {
            const value = input.value.trim();
            if(!value) {
                input.style.backgroundColor = redBg;
                skip = true;
            }
        }

        return skip;
    }

    function makeObjectOfNewRecipe() {

        const title =       document.querySelector('#creation-title')       .value.trim();
        const description = document.querySelector('#creation-description') .value.trim();
        const cooking =     document.querySelector('#creation-cooking')     .value.trim();
        const ingredients = document.querySelector('#creation-ingredients') .value.trim();
        const difficulty =  document.querySelector('#creation-difficulty')  .value.trim();
        
        const file = document.querySelector('#creation-image').files[0];
        const image = file ? URL.createObjectURL(file) : '';

        const recipe = {
            title,
            image,
            description,
            cooking,
            ingredients,
            difficulty:     +(difficulty),
            likes:          0,
            id:             (recipes.length + 1).toString()
        };

        return recipe;
    }

    useEffect(() => {
        if(!logged)
            history.push('/');
    });

    return(
        <section className="creation">
            <div className="container w-50">
                <h2 className="heading">Создать рецепт</h2>
                <hr/>
                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="creation-image">Изображение:</label>
                        <input type="file" className="form-control" id="creation-image"/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="creation-title">Название:</label>
                        <input type="text" className="form-control" id="creation-title" onChange={() => changeHandler('title')}/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="creation-ingredients">Ингредиенты:</label>
                        <textarea className="form-control" id="creation-ingredients" onChange={() => changeHandler('ingredients')}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="creation-cooking">Этапы приготовления:</label>
                        <textarea className="form-control" id="creation-cooking" onChange={() => changeHandler('cooking')}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="creation-description">Описание:</label>
                        <textarea className="form-control" id="creation-description"></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label" htmlFor="creation-difficulty">Сложность:</label>
                        <select className="form-select" id="creation-difficulty" onChange={() => changeHandler('difficulty')}>
                            <option value="" selected disabled hidden>Выберите</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button type="button" className="btn btn-primary" onClick={create}>Создать</button>
                        <button type="button" className="btn btn-primary" onClick={() => history.push('/')}>Отмена</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
