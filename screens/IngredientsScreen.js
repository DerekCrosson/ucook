import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { config } from '../constants/Config';
import asyncStore from '../storage/asyncStore';
import { IngredientsList } from '../components/IngredientsList';

export default class IngredientsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <View style={styles.searchIcon}>
          <Icon
            name='search'
            color='white'
            underlayColor='black'
            style={styles.searchIcon}
            onPress={() => navigation.navigate('SearchIngredients')} 
          /> 
        </View>
      )
    }
  };

  constructor(props){
    super(props);
    this.state = { ingredients: [] };
  }

  componentDidMount(){
    this.props.navigation.addListener('didFocus', () => {
      axios.get(`${config.ucookApi}/user/${config.mainUser}/ingredient`)
        .then(res => {
          const ingredients = res.data;
          asyncStore.setUserIngredients(ingredients);
          this.setState({ ingredients });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            {this.state.ingredients.map((i) => <IngredientsList key={i._id} {...i} />)}
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
