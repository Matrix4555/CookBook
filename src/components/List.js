import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spinner } from '../components/Spinner';
import { ListFiltration } from '../components/ListFiltration';

export function List() {

    const recipes = useSelector(state => state.recipes);
    const history = useHistory();
    let sortedIndex = 0;

    function sort(e) {

        const index = e.target.cellIndex;               // 0 - #, 1 - title, 2 - ingredients, 3 - difficulty, 4 - likes
        const table = document.querySelector('table');
        const tbody = document.querySelector('tbody');
        sortedIndex = sortedIndex === index ? -1 : index;

        const compare = (rowA, rowB) => {
            const rowAtext = rowA.cells[index].textContent;
            const rowBtext = rowB.cells[index].textContent;
            switch(index) {
                case 1:     // by title
                    return rowAtext.toLowerCase() > rowBtext.toLowerCase() ? 1 : -1;
                case 2:     // by ingredients
                    return rowAtext.length > rowBtext.length ? 1 : -1;
                case 3:     // by difficulty
                    return rowAtext > rowBtext ? 1 : -1;
                default:    // by number and likes
                    return +(rowAtext) > +(rowBtext) ? 1 : -1;
            }
        };

        let rows = [].slice.call(tbody.rows);
        sortedIndex === -1 ? rows.reverse() : rows.sort(compare);

        table.removeChild(tbody);
        for(const row of rows)
            tbody.appendChild(row);
        table.appendChild(tbody);
    }

    function showMatches() {

        const textFromSearch = document.querySelector('#search').value.toLowerCase().trim();
        const checkboxes = document.querySelectorAll('.list-filter-checkbox');
        const matches = [];

        for(const checkbox of checkboxes) {
            if(checkbox.checked) {
                const match = checkbox.nextSibling.textContent;     // get text from its label
                matches.push(match);
            }
        }

        const rows = document.querySelector('tbody').rows;
        for(const row of rows) {

            const allCells = row.textContent.toLowerCase();
            const ingredients = row.cells[2].textContent.toLowerCase();

            const hasTextFromSearch = allCells.includes(textFromSearch);
            const hasMatches = matches.every(match => ingredients.includes(match));

            row.style.display = hasTextFromSearch && hasMatches ? 'table-row' : 'none';
        }
    }

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

    return(
        <section className="list">
            <div className="list-search d-flex justify-content-center mb-2">
                <label className="list-search-label col-form-label" htmlFor="search">Найти в списке:</label>
                <input type="text" className="list-search-input form-control" id="search" onChange={showMatches}/>
            </div>
            <ListFiltration showMatches={showMatches}/>
            <table className="list-table table table-bordered">
                <thead>
                    <tr className="table-header bg-primary text-white" onClick={sort}>
                        <th className="table-header-number">№</th>
                        <th className="table-header-title">Название</th>
                        <th className="table-header-ingredients">Ингредиенты</th>
                        <th className="table-header-difficulty">Сложность</th>
                        <th className="table-header-likes">Лайки</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, ind) => {
                        return(
                            <tr className="table-item" key={recipe.id} onClick={() => history.push('/recipe/', { data: recipe })}>
                                <td>{ind + 1}</td>
                                <td className="table-item-title">{recipe.title}</td>
                                <td className="table-item-ingredients">{recipe.ingredients.split('\n').map(el => el.includes(':') ?
                                    <span className="table-item-ingredients-heading">{el}<br/></span> :
                                    <>{el}<br/></>
                                )}</td>
                                <td>{setDifficulty(recipe.difficulty)}</td>
                                <td>{recipe.likes}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {recipes.length ? null : <Spinner /> }
        </section>
    );
}
