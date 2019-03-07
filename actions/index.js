import { config } from '../constants/Config';
import axios from 'axios';

export const loadUserIngredients = () => {
    return dispatch => {
        axios.get(`${config.ucookApi}/user/${config.mainUser}/ingredient`)
            .then(res => {
                dispatch(loadUserIngredientsSuccess(res.data));
            });
      }
};


export const loadUserIngredientsSuccess = ingredients => ({
    type: 'LOAD_USER_INGREDIENTS_SUCCESS',
    ingredients
});