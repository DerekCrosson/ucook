

import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'
import Styles from '../constants/Styles';
import Func from '../constants/Func';

export class IngredientItem extends React.Component {
    render(){
        // saved item can only been removed
        var rightIcon;
        if (this.props.ticked && this.props.handleRemove) {
            rightIcon = <AntDesign name='minus' color={Colors.red} size={30} onPress={() => this.props.handleRemove(this.props.ingredient)} />;
        }

        // item not saved so can be added
        if(!this.props.ticked && this.props.handleAdd){
            rightIcon = <Icon name='add' color={Colors.green} size={30} onPress={() => this.props.handleAdd(this.props.ingredient)} />;
        }

        // try to get the ingredient image
        var image;
        if (this.props.ingredient.image) {
            image = {
                source: {uri: 'https://spoonacular.com/cdn/ingredients_100x100/' + this.props.ingredient.image}
            };
        }

        // otherwise fall back to an icon
        var leftIcon;
        if (!image) {
            leftIcon = <MaterialCommunityIcons name='food-variant' color={Colors.darkGrey} size={30} />;
        }

        return (
            <ListItem
                containerStyle={Styles.listStyle}
                leftIcon={leftIcon}
                leftAvatar={image}
                rightIcon={rightIcon}
                title={Func.capitalize(this.props.ingredient.original || this.props.ingredient.name)}
            />
        );
    }
}
