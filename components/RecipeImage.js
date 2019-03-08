import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';

export class RecipeImage extends React.Component {
    render() {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: this.props.recipe.image }}
                    style={styles.image}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.props.recipe.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    imageContainer: {
        position: 'relative'
    },  
    titleContainer: { 
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    title: {
        fontSize: 20,
        margin: 15,
        color: '#fff'
    }
})