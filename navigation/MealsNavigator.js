import React from "react";
import {Platform, Text} from "react-native";

import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {createDrawerNavigator} from "react-navigation-drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";
import {Ionicons} from "@expo/vector-icons";


const defaultStackNavOptions = {
    headerStyle : {
        backgroundColor : Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTitleStyle : {
      fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle : {
      fontFamily : 'open-sans'
    },
    headerTintColor : Platform.OS === 'android' ? 'white' : Colors.primaryColor,
}

const MealsNavigator = createStackNavigator({
    Categories : CategoriesScreen,
    CategoryMeals : CategoryMealsScreen,
    MealDetail : MealDetailScreen,
},
    {defaultNavigationOptions : defaultStackNavOptions })


const FavNavigator = createStackNavigator({
    Favourites : FavouritesScreen,
    MealDetail : MealDetailScreen,
},
    {defaultNavigationOptions : defaultStackNavOptions})

const tabScreenConfig = {
    Meals : {screen : MealsNavigator, navigationOptions : {
            tabBarLabel : Platform.OS === 'android' ? <Text
                style={{fontFamily : 'open-sans-bold'}}>
                Recepies
            </Text> : "Recepies",
            tabBarIcon : (tabInfo) => {
                return <Ionicons name={'ios-restaurant'} size={25}
                                 color={tabInfo.tintColor}/> ;
            },
            tabBarColor :Colors.primaryColor,
        }},
    Favourites : {screen : FavNavigator, navigationOptions : {
            tabBarLabel : Platform.OS === 'android' ? <Text
                style={{fontFamily : 'open-sans-bold'}}>
                Favourites!
            </Text> : "Favourites",
            tabBarIcon : (tabInfo) => {
                return <Ionicons name={'ios-star'} size={25}
                                 color={tabInfo.tintColor}/> ;
            },
            tabBarColor: Colors.accentColor,
        }},
}

const MealsFavTabNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColorLight : 'white',
        shifting : true,

    })
    :
    createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions : {
        labelStyle : {
            fontFamily : 'open-sans-bold',
        },
        activeTintColor : Colors.accentColor,
    }
});

const FilterNavigator = createStackNavigator({
    Filters : FiltersScreen,
}, {defaultNavigationOptions : defaultStackNavOptions})

const MainNavigator = createDrawerNavigator({
    MealsFavs : {screen : MealsFavTabNavigator,
        navigationOptions : {
            drawerLabel : 'Recepies ',
        }},
    Filters : FilterNavigator,
}, {
    contentOptions : {
        activeTintColor : Colors.accentColor,
        labelStyle : {
            fontFamily : 'open-sans-bold',

        }
    }
})

export default createAppContainer(MainNavigator);