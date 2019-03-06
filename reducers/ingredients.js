
export default (state = [], action) => {
    switch(action.type) {
        case 'LOAD_USER_INGREDIENTS_SUCCESS': {
            return action.ingredients; 
        }
        default : 
            return state;
    }
}