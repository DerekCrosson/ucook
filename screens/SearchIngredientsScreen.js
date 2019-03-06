import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { config } from '../constants/Config';
import { IngredientItem } from '../components/IngredientsItem';
import userService from '../services/user/user.service';

export default class SearchIngredientsScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = { 
      searchValue: '', 
      ingredients: []
    };
  }

  handleSearchChange(searchValue) {
    this.setState({ searchValue })
    if (searchValue && searchValue.length > 3) {
      // query the ingredients API
      axios({
        method: 'get',
        url: config.ucookApi + '/ingredient',
        params: {
          search: searchValue
        }
      })
      .then(async (res) => {
        const ingredients = res.data || [];
        // TODO add ticked to ingredients if user already has saved
        // ingredients.map(i => {
        //   return savedIng.find(item => item._id === i._id) ? Object.assign({}, i, {ticked: true}) : i;
        // });
        this.setState({ ingredients });
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  addIngredient = ingredient => {
    axios.post(`${config.ucookApi}/user/${config.mainUser}/ingredient`, ingredient)
      .then(() => {
        const ingredients = this.state.ingredients.map(i => {
          return ingredient._id === i._id ? Object.assign({}, i, {ticked: true}) : i;
        });
        this.setState({ ingredients });
      })
      .catch(error => {
        console.error(error);
      })
  }

  removeIngredient = ingredient => {
    userService.removeIngredient(ingredient)
      .then(() => {
        const ingredients = this.state.ingredients.map(i => {
          return ingredient._id === i._id ? Object.assign({}, i, {ticked: false}) : i;
        });
        this.setState({ ingredients });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <SearchBar 
            lightTheme 
            inputContainerStyle= {styles.inputStyle}
            containerStyle={styles.searchBar}
            inputStyle={styles.inputStyle}
            onChangeText={(text) => this.handleSearchChange(text)}
            value={this.state.searchValue}
            placeholder='Search ingredients...'>
          </SearchBar>
        </View>
        <ScrollView>
          <View>
          {this.state.ingredients.map((i) => (
            <IngredientItem
              key={i._id}
              ticked={i.ticked}
              ingredient={i} 
              handleRemove={this.removeIngredient}
              handleAdd={this.addIngredient}
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
  searchBar: {
    backgroundColor: null,
  },
  inputStyle: {
    backgroundColor: '#fff'
  }
});