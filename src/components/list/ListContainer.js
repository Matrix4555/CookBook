import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Search } from '../list-control/Search';
import { Filter } from '../list-control/Filter';
import { List } from './List';

export function ListContainer() {

    const history = useHistory();
    const recipes = useSelector(state => state.recipes);

    const [wayOfSorting, setWayOfSorting] = useState(1);
    const [matchFromSearch, setMatchFromSearch] = useState('');
    const [matchesFromFilters, setMatchesFromFilters] = useState([]);

    function search() {
        const match = document.querySelector('#search').value.trim().toLowerCase();
        setMatchFromSearch(match);
    }

    function setFilter(e) {
        const checkbox = e.target;
        const match = checkbox.nextSibling.textContent;
        checkbox.checked ?
            setMatchesFromFilters(matchesFromFilters.concat(match)) :
            setMatchesFromFilters(matchesFromFilters.filter(el => el !== match));
    }

    function setSort(e) {
        let index = e.target.cellIndex + 1;     // 1 - #, 2 - title, 3 - ingredients, 4 - difficulty, 5 - likes
        const way = wayOfSorting === index ? -index : index;
        setWayOfSorting(way);
    }

    function getFilteredAndSortedRecipes() {
        const r = recipes.filter(recipe =>
            matchesToSearch(recipe) &&
            matchesToFilters(recipe.ingredients));
        r.sort(compareBy(wayOfSorting));
        return r;
    }

    function matchesToSearch(recipe) {
        const fields = [
            recipe.title.toLowerCase(),
            recipe.ingredients.toLowerCase()
        ];
        return fields.some(field => field.includes(matchFromSearch));
    }

    function matchesToFilters(ingredients) {
        return matchesFromFilters.every(match => ingredients.toLowerCase().includes(match));
    }
    
    function compareBy(way) {
        let x = 1;
        let y = -1;
        if(way < 0) {
            x = -1;
            y = 1;
            way *= -1;
        }
        return function(a, b) {
            switch(way) {
            case 1:
                return +(a.id) > +(b.id) ? x : y;
            case 2:
                return a.title.toLowerCase() > b.title.toLowerCase() ? x : y;
            case 3:
                return a.ingredients.length > b.ingredients.length ? x : y;
            case 4:
                return a.difficulty > b.difficulty ? x : y;
            case 5:
                return a.likes > b.likes ? x : y;
            }
        };
    }

    function goToRecipePage(recipe) {
        history.push('/recipe/', { data: recipe });
    }

    return(
        <>
            <Search search={search} />
            <Filter setFilter={setFilter} />
            <List recipes={getFilteredAndSortedRecipes()} loading={!recipes.length} setSort={setSort} goToRecipePage={goToRecipePage} />
        </>
    );
}
