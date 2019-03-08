import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export class Tabs extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.buttons.map((b, i) => (
                    <View key={b} style={styles.buttonContainer}>
                        <Button 
                            title={b} 
                            buttonStyle={this.props.selectedIndex === i ? styles.buttonSelected : styles.button} 
                            titleStyle={this.props.selectedIndex === i && styles.textSelected}
                            onPress={() => this.props.updateIndex(i)} 
                        />
                    </View>
                ))}
            </View>
        );
    }
}

const button = {
    borderRadius: 0,
    height: 50
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center', 
        flexWrap: 'nowrap'
    },
    textSelected: {
        color: '#000'
    },
    buttonSelected: {
        ...button,
        backgroundColor: '#fff',
    },
    button: button,
    buttonContainer: {
        flex: 1,
      }
})