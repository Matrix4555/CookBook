import React from 'react';

export function ListFiltration({showMatches}) {
    return(
        <div className="list-filter d-flex flex-column align-items-center mb-5">
            <span>Фильтр ингредиентов:</span>
            <div className="list-filter-group btn-group">
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck1" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck1">яйца</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck2" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck2">молоко</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck3" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck3">масло</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck4" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck4">мука</label>
            </div>
            <div className="list-filter-group btn-group">
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck5" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck5">курица</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck6" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck6">говядина</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck7" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck7">свинина</label>
            </div>
            <div className="list-filter-group btn-group">
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck8" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck8">огурец</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck9" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck9">помидор</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck10" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck10">лук</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck11" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck11">чеснок</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck12" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck12">лимон</label>
            </div>
            <div className="list-filter-group btn-group">
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck13" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck13">сахар</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck14" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck14">соль</label>
                <input type="checkbox" className="list-filter-checkbox btn-check" id="filtercheck15" autoComplete="off" onChange={showMatches}/>
                <label className="btn btn-outline-primary" htmlFor="filtercheck15">вода</label>
            </div>
        </div>
    );
}
