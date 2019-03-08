export default (state = [], action) => {
    switch(action.type) {
        case 'LOAD_USER_INGREDIENTS_SUCCESS': {
            return action.ingredients.reverse(); 
        }
        case 'ADD_USER_INGREDIENT_SUCCESS': { 
            return [action.ingredient].concat(state);
        }
        case 'REMOVE_USER_INGREDIENT_SUCCESS': {
            return state.filter(i => i._id !== action.ingredient._id);
        }
        default : 
            return state;
    }
}