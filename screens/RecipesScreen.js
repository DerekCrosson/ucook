import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { RecipeItem } from '../components/RecipeItem';

export default class RecipesScreen extends React.Component {
  static navigationOptions = {
  };

  constructor(props){
    super(props);
    this.state = {
      recipes: [
        {
            "id": 67143,
            "title": "Pineapple & Ham Bread Soufflé",
            "image": "https://spoonacular.com/recipeImages/67143-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 4,
            "missedIngredientCount": 0,
            "likes": 28
        },
        {
            "id": 265150,
            "title": "Stuffed French Toast",
            "image": "https://spoonacular.com/recipeImages/265150-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 4,
            "missedIngredientCount": 2,
            "likes": 1
        },
        {
            "id": 125980,
            "title": "Monte Cristo Sandwich",
            "image": "https://spoonacular.com/recipeImages/125980-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 4,
            "missedIngredientCount": 2,
            "likes": 0
        },
        {
            "id": 137578,
            "title": "Monte Cristo Sandwich",
            "image": "https://spoonacular.com/recipeImages/137578-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 4,
            "missedIngredientCount": 3,
            "likes": 0
        },
        {
            "id": 158921,
            "title": "Monte Cristo Stuffed French Toast with Strawberry Syrup",
            "image": "https://spoonacular.com/recipeImages/158921-312x231.jpg",
            "imageType": "jpg",
            "usedIngredientCount": 4,
            "missedIngredientCount": 3,
            "likes": 0
        }
    ]
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.recipes.map(r => <RecipeItem key={r.id} {...r} />)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
