import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../redux/actions';

export function Creation() {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const logged = useSelector(state => state.logged);
    const history = useHistory();
    const redBg = 'rgba(255, 0, 0, .2)';

    function changeHandler(input) {
        const currentInput = document.querySelector(`#creation-${input}`);
        const text = currentInput.value.trim();
        currentInput.style.backgroundColor = !text ? redBg : 'white';
    }

    function create() {

        let skip = false;
        const title = document.querySelector('#creation-title');
        const ingredients = document.querySelector('#creation-ingredients');
        const cooking = document.querySelector('#creation-cooking');
        const difficulty = document.querySelector('#creation-difficulty');

        for(const input of [title, ingredients, cooking, difficulty]) {
            if(!input.value.trim()) {
                input.style.backgroundColor = redBg;
                skip = true;
            }
        }

        if(skip)
            return;
        
        let image = '';
        const file = document.querySelector('#creation-image').files[0];
        if(file)
            image = URL.createObjectURL(file);
        const description = document.querySelector('#creation-description');
        
        const recipe = {
            title:          title.value.trim(),
            image,
            description:    description.value.trim(),
            cooking:        cooking.value.trim(),
            ingredients:    ingredients.value.trim(),
            difficulty:     +(difficulty.value.trim()),
            likes:          0,
            id:             (recipes.length + 1).toString()
        };

        dispatch(addRecipe(recipe))
            .then(() => history.push('/'));
    }
    
    useEffect(() => {
        if(!logged)
            history.push('/');
    });

    return(
        <section className="creation">
            <div className="container w-50">
                <h2 className="creation-header">Создать рецепт</h2>
                <hr/>
                <form className="creation-form" onSubmit={e => e.preventDefault()}>
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
                    <div className="creation-bottom page-bottom">
                        <button type="button" className="btn btn-primary" onClick={create}>Создать</button>
                        <button type="button" className="btn btn-primary" onClick={() => history.push('/')}>Отмена</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
