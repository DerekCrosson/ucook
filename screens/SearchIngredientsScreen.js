import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import axios from 'axios';
import { config } from '../constants/Config';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { IngredientsList } from '../components/IngredientsList';

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
      .then(res => {
        const ingredients = res.data;
        this.setState({ ingredients });
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  addIngredient(ingredient){
    axios({
      method: 'post',
      url: `${config.ucookApi}/user/${config.mainUser}/ingredient`,
      data: ingredient
    })
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

  removeIngredient() {

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
            <IngredientsList
              {...i}
              key={i._id}
              rightIcon={
                i.ticked ? <AntDesign name='minus' color={Colors.red} size={30} onPress={() => this.removeIngredient(i)} />  :
                           <Icon name='add' color={Colors.green} size={30} onPress={() => this.addIngredient(i)} />} />
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