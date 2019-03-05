

import React from 'react';
import { ListItem } from 'react-native-elements';
import Colors from '../constants/Colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Styles from '../constants/Styles';
import Func from '../constants/Func';

export class IngredientsList extends React.Component {
    render(){
        return (
            <ListItem
                containerStyle={Styles.listStyle}
                leftIcon={ <MaterialCommunityIcons name='food-variant' color={Colors.darkGrey} size={30} />}
                rightIcon={this.props.rightIcon}
                title={Func.capitalize(this.props.name)}
            />
        );
    }
}
