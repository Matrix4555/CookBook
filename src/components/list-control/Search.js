import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/search.scss';

export function Search({search}) {
    return(
        <div className="search d-flex justify-content-center mb-2">
            <label className="col-form-label" htmlFor="search">Найти в списке:</label>
            <input type="text" className="form-control" id="search" onChange={search}/>
        </div>
    );
}

Search.propTypes = {
    search: PropTypes.func
};
