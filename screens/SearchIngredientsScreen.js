import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default class SearchIngredientsScreen extends React.Component {
  static navigationOptions = {
    title: 'Search Ingredients',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        Hello
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
