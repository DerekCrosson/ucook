import axios from 'axios';
import { config } from '../../constants/Config';

const getIngredients = () => {
    return axios.get(`${config.ucookApi}/user/${config.mainUser}/ingredient`);
};

const removeIngredient = ingredient => {
    return axios.delete(`${config.ucookApi}/user/${config.mainUser}/ingredient/${ingredient._id}`)
};

const addIngredient = ingredient => {
    return axios.post(`${config.ucookApi}/user/${config.mainUser}/ingredient`, ingredient);
}

export default {
    getIngredients,
    removeIngredient,
    addIngredient
}