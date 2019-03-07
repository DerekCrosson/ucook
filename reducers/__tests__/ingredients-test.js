import reducer from '../ingredients';
import ingredients from '../../__mocks__/ingredients-mock';

describe('ingredients reducer', () => {
    it('should return the inital state', () => {
        expect(reducer(undefined, {})).toEqual([]);
    });

    it('should handle LOAD_USER_INGREDIENTS_SUCCESS', () => {
        const action = {
            type: 'LOAD_USER_INGREDIENTS_SUCCESS',
            ingredients
        };
        expect(reducer({}, action)).toEqual([
            { _id: '654321',
                id: 54321,
                name: 'eggs'},
            { _id: '123456',
                id: 12345,
                name: 'bacon' }
        ]);
    });

    it('should handle ADD_USER_INGREDIENT', () => {
        const ingredient = {_id: 123, id: 321, name: 'cheese'};
        const action = {
            type: 'ADD_USER_INGREDIENT',
            ingredient
        };
        expect(reducer(ingredients, action)).toEqual([ingredient].concat(ingredients));
    });
    
    it('should handle REMOVE_USER_INGREDIENT', () => {
        const action = {
            type: 'REMOVE_USER_INGREDIENT',
            ingredient: {_id: '654321', id: 12345, name: 'eggs'}
        };
        expect(reducer(ingredients, action)).toEqual([{
            _id: '123456',
            id: 12345,
            name: 'bacon'
        }]);     
    });
});