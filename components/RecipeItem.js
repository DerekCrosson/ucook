

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import Func from '../constants/Func';
import { Image, Rating } from 'react-native-elements';
import {Entypo} from '@expo/vector-icons'

export class RecipeItem extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.props.image }}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={4}
                        style={{ marginTop: 10, alignSelf: 'flex-start' }}
                    />
                    {this.props.missedIngredientCount === 0 
                        ? <Entypo name='check' size={30} color={Colors.green} style={styles.tick} />
                        : <Text style={styles.missingText}><Text style={{ fontSize: 17 }}>{this.props.missedIngredientCount}</Text> missing</Text>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      ...Styles.listStyle
    },
    text: {
        fontSize: 16
    },
    tick: {
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    image: {
        width: 100, 
        height: 100,
        margin: 10
    },
    content: {
        margin: 10,
        marginLeft: 0,
        flex: 1,
        flexDirection: 'column'
    },
    missingText: {
        marginTop: 10, 
        color: Colors.red,
        fontSize: 14
    }
});