import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchIngredientsScreen from '../screens/SearchIngredientsScreen';
import IngredientsScreen from '../screens/IngredientsScreen';
import Colors from '../constants/Colors';

const defaultNavigationOptions = {
  defaultNavigationOptions: {
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
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarOptions: {
    activeTintColor: Colors.primary
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: {
    activeTintColor: Colors.primary
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  IngredientsStack: IngredientsStack,
  LinksStack,
  SettingsStack,
});
