import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLikes } from '../../redux/actions';
import PropTypes from 'prop-types';
import { Recipe } from './Recipe';

export function RecipeContainer(props) {

    const dispatch = useDispatch();
    const logged = useSelector(state => state.logged);
    const history = useHistory();
    const recipe = props.history.location.state.data;

    const [pageIsInitialized, setPageIsInitialized] = useState(false);
    const [likes, setLikes] = useState(recipe.likes);
    const [isLiked, setLiked] = useState(
        logged ? logged.liked.includes(recipe.id) : false
    );

    function toLike() {
        if(!logged)
            return;

        const add = isLiked ? -1 : 1;
        setLikes(likes + add);
        setLiked(!isLiked);

        dispatch(updateLikes(recipe, add))
            .catch(e => {
                setLikes(likes - add);
                setLiked(isLiked);
                alert(e);
            });
    }

    function goToMainPage() {
        history.push('/');
    }

    function showDifficulty() {
        setTimeout(() => {
            const levels = document.querySelectorAll('.difficulty > .level');
            for(let i = 0; i < recipe.difficulty; i++)
                levels[i].classList.add('filled-level');
        }, 0);
    }

    function makeHintAboutNeedForAuthorization() {
        const likesDiv = document.querySelector('#likes_div');
        likesDiv.setAttribute('data-tooltip', 'Вам нужно войти в аккаунт');
    }

    useEffect(() => {
        if(!pageIsInitialized) {
            window.scrollTo(0, 0);
            showDifficulty();
            if(!logged)
                makeHintAboutNeedForAuthorization();
            setPageIsInitialized(true);
        }
    });
    
    return (
        <Recipe recipe={recipe} likes={likes} isLiked={isLiked} toLike={toLike} goToMainPage={goToMainPage} />
    );
}

RecipeContainer.propTypes = {
    history: PropTypes.object
};
