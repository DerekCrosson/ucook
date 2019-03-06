import axios from 'axios';
import { config } from '../../constants/Config';

const removeIngredient = ingredient => {
    return axios.delete(`${config.ucookApi}/user/${config.mainUser}/ingredient/${ingredient._id}`)
};

export default {
    removeIngredient
}