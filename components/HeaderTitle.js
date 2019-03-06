

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Colors from '../constants/Colors';
import {MaterialCommunityIcons, Entypo} from '@expo/vector-icons'

export class HeaderTitle extends React.Component {
    constructor(props){
        super(props);
    }

    toggleEdit = () => {
        const editing = !this.props.editing;
        this.props.handleEdit(editing);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
                {this.props.handleEdit && !this.props.editing && <MaterialCommunityIcons 
                    name='square-edit-outline' 
                    size={30} 
                    onPress={() => this.toggleEdit()}
                    style={styles.icon} />}
                {this.props.handleEdit && this.props.editing && <Entypo 
                    name='check' 
                    size={30} 
                    onPress={() => this.toggleEdit()}
                    style={styles.icon} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 20, 
        flexDirection: 'row',
        backgroundColor: Colors.lightGrey,
        justifyContent: 'space-between' 
    },
    text: {
        fontSize: 18
    },  
    icon: {
        color: Colors.primary,
    }
});