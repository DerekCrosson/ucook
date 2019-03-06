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
import { IngredientItem } from '../components/IngredientsItem';
import { HeaderTitle } from '../components/HeaderTitle';
import userService from '../services/user/user.service';
import {AntDesign} from '@expo/vector-icons';


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
    this.state = { 
      ingredients: [],
      editing: false
    };
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

  handleEdit = editing => {
    this.setState({ editing });
  }

  removeIngredient = ingredient => {
    userService.removeIngredient(ingredient)
      .then(() => {
        const ingredients = this.state.ingredients.filter(i => i._id !== ingredient._id);
        this.setState({ ingredients });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderTitle title='Your Ingredients' editing={this.state.editing} handleEdit={this.handleEdit} />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            {this.state.ingredients.map((i) => (
              <IngredientItem 
                key={i._id} 
                ticked={true}
                ingredient={i} 
                handleRemove={this.state.editing && this.removeIngredient}
                />
            ))}
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
    paddingTop: 10,
    paddingBottom: 10
  }
});
