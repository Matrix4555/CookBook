import React from 'react';

export function Spinner() {
    return(
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
