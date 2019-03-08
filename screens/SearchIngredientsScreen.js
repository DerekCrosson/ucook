import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { config } from '../constants/Config';
import { IngredientItem } from '../components/IngredientsItem';
import {connect} from 'react-redux';
import {addUserIngredient, removeUserIngredient} from '../actions';

class SearchIngredientsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchValue: '', 
      searchedIngredients: []
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
      .then(res => {
        const ingredients = res.data || [];
        // remove ingredients that have same ID but different name
        const filtered = ingredients.filter(i => {
          const found = this.props.ingredients.find(item => item.id === i.id && item.name !== i.name);
          return found ? null : i;
        });
        // mark saved ingredients as ticked
        const searchedIngredients = filtered.map(i => {
          const found = this.props.ingredients.find(item => item.id === i.id);
          return found ? Object.assign({}, i, {ticked: true}) : i
        });
        this.setState({ searchedIngredients }); 
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  addIngredient = ingredient => {
    this.markIngredientTicked(ingredient, true);
    this.props.addUserIngredient(ingredient);
  }

  removeIngredient = ingredient => {
    this.markIngredientTicked(ingredient, false);
    this.props.removeUserIngredient(ingredient);
  }

  markIngredientTicked(ingredient, ticked){
    const searchedIngredients = this.state.searchedIngredients.map(i => {
      return ingredient._id === i._id ? Object.assign({}, i, {ticked}) : i;
    });
    this.setState({ searchedIngredients });
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
          {this.state.searchedIngredients.map((i) => (
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  }
}

const mapDispatchToProps = { addUserIngredient, removeUserIngredient }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchIngredientsScreen) 

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