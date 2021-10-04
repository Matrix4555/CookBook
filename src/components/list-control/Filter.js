import React from 'react';
import PropTypes from 'prop-types';
import { FilterItem } from './FilterItem';
import '../../styles/filter.scss';

export function Filter({setFilter}) {
    return(
        <div className="filter d-flex flex-column align-items-center mb-5">
            <span>Фильтр ингредиентов:</span>
            <div className="group btn-group">
                <FilterItem id={1} title={'яйца'} showMatches={setFilter} />
                <FilterItem id={2} title={'молоко'} showMatches={setFilter} />
                <FilterItem id={3} title={'масло'} showMatches={setFilter} />
                <FilterItem id={4} title={'мука'} showMatches={setFilter} />
            </div>
            <div className="group btn-group">
                <FilterItem id={5} title={'курица'} showMatches={setFilter} />
                <FilterItem id={6} title={'говядина'} showMatches={setFilter} />
                <FilterItem id={7} title={'свинина'} showMatches={setFilter} />
            </div>
            <div className="group btn-group">
                <FilterItem id={8} title={'огурец'} showMatches={setFilter} />
                <FilterItem id={9} title={'помидор'} showMatches={setFilter} />
                <FilterItem id={10} title={'лук'} showMatches={setFilter} />
                <FilterItem id={11} title={'чеснок'} showMatches={setFilter} />
                <FilterItem id={12} title={'лимон'} showMatches={setFilter} />
            </div>
            <div className="group btn-group">
                <FilterItem id={13} title={'сахар'} showMatches={setFilter} />
                <FilterItem id={14} title={'соль'} showMatches={setFilter} />
                <FilterItem id={15} title={'вода'} showMatches={setFilter} />
            </div>
        </div>
    );
}

Filter.propTypes = {
    setFilter: PropTypes.func
};
