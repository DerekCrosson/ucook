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
    this.props.navigation.addListener('didFocus', () => this.getUserIngredients());
  }

  getUserIngredients = async () => {
    axios.get(`${config.ucookApi}/user/${config.mainUser}/ingredient`)
      .then(async res => {
        const ingredients = res.data;
        // save in redux state
        this.setState({ ingredients });
      })
      .catch(err => {
        console.log(err);
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
  }
});
