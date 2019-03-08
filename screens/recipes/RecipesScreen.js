import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RecipeItem } from '../../components/RecipeItem';
import axios from 'axios';
import { config } from '../../constants/Config';
import {connect} from 'react-redux';

class RecipesScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: []
    }
  }

  componentDidMount(){
    this.props.navigation.addListener('didFocus', () => this.getRecipes());
  }

  getRecipes(){
    const ingredients = this.props.ingredients.map(i => (i.name));
    if(ingredients){
      axios.get(config.ucookApi + '/recipeByIngredients', {
        params: {
          ingredients: ingredients.join(',')
        } 
      })
      .then(res => {
        this.setState({recipes: res.data});
      })
      .catch(console.error);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.recipes.map(r => <RecipeItem key={r.id} recipe={r} {...this.props} />)}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  }
}

export default connect(
  mapStateToProps,
  {}
)(RecipesScreen) 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
