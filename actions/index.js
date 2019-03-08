import userService from '../services/user/user.service';

export const loadUserIngredients = () => {
    return dispatch => {
        userService.getIngredients()
            .then(res => {
                dispatch(loadUserIngredientsSuccess(res.data));
            })
            .catch(console.error);
      }
};

export const removeUserIngredient = ingredient => { 
    return dispatch => {
        userService.removeIngredient(ingredient)
            .then(() => {
                dispatch(removeUserIngredientSuccess(ingredient));
            })
            .catch(console.error);
      }
};

export const addUserIngredient = ingredient => { 
    return dispatch => {
        userService.addIngredient(ingredient)
            .then(() => {
                dispatch(addUserIngredientSuccess(ingredient));
            })
            .catch(console.error);
      }
};

const addUserIngredientSuccess = ingredient => ({
    type: 'ADD_USER_INGREDIENT_SUCCESS',
    ingredient
});

const removeUserIngredientSuccess = ingredient => ({
    type: 'REMOVE_USER_INGREDIENT_SUCCESS',
    ingredient
});

const loadUserIngredientsSuccess = ingredients => ({
    type: 'LOAD_USER_INGREDIENTS_SUCCESS',
    ingredients
});