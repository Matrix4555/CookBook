import React from 'react';
import PropTypes from 'prop-types';

export function FilterItem({id, title, showMatches}) {
    return(
        <>
            <input type="checkbox" className="btn-check" id={`filtercheck${id}`} autoComplete="off" onChange={showMatches}/>
            <label className="btn btn-outline-primary" htmlFor={`filtercheck${id}`}>{title}</label>
        </>       
    );
}

FilterItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    showMatches: PropTypes.func
};
