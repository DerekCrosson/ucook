import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { config } from '../../constants/Config';
import { RecipeImage } from '../../components/RecipeImage';
import { Tabs } from '../../components/Tabs';
import { IngredientItem } from '../../components/IngredientsItem';

export default class RecipeDetailScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipe: {},
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  componentDidMount(){
    this.props.navigation.addListener('didFocus', () => this.getRecipe());
  }

  getRecipe(){
    const id = this.props.navigation.getParam('id', 'NO-ID')
    axios.get(config.ucookApi + '/recipe/' + id)
        .then(res => {
            this.setState({recipe: res.data});
        })
        .catch(console.error);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['Ingredients', 'Method']
    const { selectedIndex } = this.state
    return (
      <ScrollView style={styles.container}>
        <RecipeImage recipe={this.state.recipe}/>
        <Tabs 
            buttons={buttons}
            updateIndex={this.updateIndex}
            selectedIndex={selectedIndex}
        />
        {this.state.selectedIndex === 0 && 
         this.state.recipe.extendedIngredients && 
         this.state.recipe.extendedIngredients.map(i => (
            <IngredientItem 
                key={i.id} 
                ingredient={i} 
            />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
  }
});
