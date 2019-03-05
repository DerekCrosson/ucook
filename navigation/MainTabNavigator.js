import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchIngredientsScreen from '../screens/SearchIngredientsScreen';
import IngredientsScreen from '../screens/IngredientsScreen';
import Colors from '../constants/Colors';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    title: 'UCOOK',
    headerStyle: {
      backgroundColor: Colors.primary, 
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}

const IngredientsStack = createStackNavigator(
  {
    IngredientsScreen: IngredientsScreen,
    SearchIngredients: SearchIngredientsScreen,
  },
  {
    initialRouteName: 'IngredientsScreen',
    ...defaultNavigationOptions
  } 
);

IngredientsStack.navigationOptions = {
  tabBarLabel: 'Ingredients',
  tabBarOptions: {
    activeTintColor: Colors.primary
  },
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name='food-variant'
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const RecipesStack = createStackNavigator({
  Links: LinksScreen,
});

RecipesStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarOptions: {
    activeTintColor: Colors.primary
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-create'
    />
  ),
};

const ShoppingListStack = createStackNavigator({
  Settings: SettingsScreen,
});

ShoppingListStack.navigationOptions = {
  tabBarLabel: 'Shopping',
  tabBarOptions: {
    activeTintColor: Colors.primary
  },
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      name='shopping-cart'
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

export default createBottomTabNavigator({
  IngredientsStack: IngredientsStack,
  LinksStack: RecipesStack,
  SettingsStack: ShoppingListStack,
});
