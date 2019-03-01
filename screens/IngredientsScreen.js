import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { Icon } from 'react-native-elements';

export default class IngredientsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
 
        <View style={styles.searchIcon}>
          <Icon
            name='search'
            style={styles.searchIcon}
            onPress={() => navigation.navigate('SearchIngredients')} 
          />
        </View>
      )
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
 
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 20
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
