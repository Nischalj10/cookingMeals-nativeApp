import React from "react";
import {CATEGORIES} from "../data/dummy-data";
import MealList from "../components/MealList";
import {useSelector} from "react-redux";
import {View} from "react-native";
import BoldText from "../components/BoldText";

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId)
    const availableMeals = useSelector((state) =>
        state.meals.filteredMeals)
    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >=0)

    if(displayedMeals.length >0) {
        return (
            <MealList listData={displayedMeals}
                      navigation={props.navigation}/>
        )
    } else {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex :1}}>
                <BoldText>
                    No meals available with the current filters!
                </BoldText>
            </View>
        )

    }

}

CategoryMealsScreen.navigationOptions = (navigationData) => {
   //console.log("NAVIGATION DATA --->",navigationData)
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId)

    return {
        headerTitle: selectedCategory.title,
    }
}



export default CategoryMealsScreen