import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import axios from 'axios';
import { config } from '../constants/Config';

export default class SearchIngredientsScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = { 
      searchValue: '', 
      ingredients: [],
      error: ''
    };
  }

  handleInputChange(searchValue) {
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
        console.error(error)
        this.setState({ error });
      })
    }
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
            onChangeText={(text) => this.handleInputChange(text)}
            value={this.state.searchValue}
            placeholder='Search ingredients...'>
          </SearchBar>
        </View>
        <ScrollView>
          <View>
            {this.state.ingredients.map((i) => (
              <ListItem
                key={i._id}
                leftIcon={{ name: 'local-pizza' }}
                title={i.name}
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
  searchContainer: {
    flex: 1
  },
  searchBar: {
    backgroundColor: null,
  },
  inputStyle: {
    backgroundColor: '#fff'
  }
});