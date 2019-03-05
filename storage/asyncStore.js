import { AsyncStorage } from 'react-native';

const getUserIngredients = async () => {
    var ingredients = [];
    try {
        ingredients = await AsyncStorage.getItem('ingredients');
    } catch (err) {
        console.log(err);
    }
    return ingredients;
};

const setUserIngredients = async (ingredients) => {
    try {
        await AsyncStorage.setItem('ingredients', ingredients);
    } catch (err) {
        console.log(err);
    }
};

export default {
    setUserIngredients,
    getUserIngredients
}