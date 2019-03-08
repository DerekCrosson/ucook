import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { config } from '../constants/Config';
import { IngredientItem } from '../components/IngredientsItem';
import { HeaderTitle } from '../components/HeaderTitle';
import userService from '../services/user/user.service';
import {connect} from 'react-redux';
import {loadUserIngredients, removeUserIngredient} from '../actions';

class IngredientsScreen extends React.Component {
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
    this.props.loadUserIngredients();
  }

  handleEdit = editing => {
    this.setState({ editing });
  }

  removeIngredient = ingredient => {
    this.props.removeUserIngredient(ingredient);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderTitle title='Your Ingredients' editing={this.state.editing} handleEdit={this.handleEdit} />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            {this.props.ingredients.map((i) => (
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  }
}

const mapDispatchToProps = { loadUserIngredients, removeUserIngredient }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientsScreen) 

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
