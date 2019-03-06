import axios from 'axios';
import { config } from '../../constants/Config';

const removeIngredient = ingredient => {
    return axios.delete(`${config.ucookApi}/user/${config.mainUser}/ingredient/${ingredient._id}`)
};

const addIngredient = ingredient => {
    return axios.post(`${config.ucookApi}/user/${config.mainUser}/ingredient`, ingredient);
}

export default {
    removeIngredient,
    addIngredient
}