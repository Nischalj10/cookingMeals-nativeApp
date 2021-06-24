import React from "react";
import MealList from "../components/MealList";
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import {Platform, View} from "react-native";
import BoldText from "../components/BoldText";

const FavouritesScreen = props => {

    const favMeals = useSelector(state => state.meals.favouriteMeals)

    if(favMeals.length === 0 || !favMeals) {
        return (
            <View style={{justifyContent : 'center', alignItems: 'center', flex: 1}}>
                <BoldText>
                    No favourite meals found! Start by adding some :)
                </BoldText>
            </View>
        )
    }
    else {
        return (
            <MealList listData={favMeals} navigation={props.navigation}/>
        )
    }
}

FavouritesScreen.navigationOptions = navData => {
    return {
        headerTitle : "Your Favs!",
        headerLeft : () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title={"Menu"} iconName={'ios-menu'}
                  onPress={() => {
                      navData.navigation.toggleDrawer();
                  }}/>
        </HeaderButtons>,
        headerStyle : {
            backgroundColor : Platform.OS === 'android' ? Colors.accentColor : '',
        },
    }
}


export default FavouritesScreen