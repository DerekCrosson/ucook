

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

        return (
            <ListItem
                containerStyle={Styles.listStyle}
                leftIcon={ <MaterialCommunityIcons name='food-variant' color={Colors.darkGrey} size={30} />}
                rightIcon={rightIcon}
                title={Func.capitalize(this.props.ingredient.name)}
            />
        );
    }
}
