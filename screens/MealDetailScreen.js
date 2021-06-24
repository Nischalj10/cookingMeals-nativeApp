import React, {useCallback, useEffect} from "react";
import {ScrollView, View, Text, StyleSheet, Button, Platform, Image} from "react-native";
import {MEALS} from "../data/dummy-data";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import BoldText from "../components/BoldText";
import DefaultText from "../components/DefaultText";
import {toggleFavourite} from "../store/actions/meals";

const ListItem = props => {
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals)
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = availableMeals.find(meal=> meal.id === mealId)
    const currentMealIsFavourite = useSelector(state =>
        state.meals.favouriteMeals.some(meal =>
            meal.id === mealId));

    const dispatch = useDispatch();

    const toggleFavouriteHandler =useCallback( () => {
        dispatch(toggleFavourite(mealId));
    }, [dispatch, mealId]);

    // useEffect(() => {
    //     props.navigation.setParams({mealTitle: selectedMeal.title})
    // }, [selectedMeal])
    //not using this above method because it shows the title after the
    //component is rendered which looks laggy. so we are sending it in advance
    //from meal list component from where we tap on a meal

    useEffect(() => {
        props.navigation.setParams({toggleFav : toggleFavouriteHandler})
    }, [toggleFavouriteHandler])

    useEffect(() => {
        props.navigation.setParams({isFav : currentMealIsFavourite})
    }, [currentMealIsFavourite])

    return (
        <ScrollView>
            <Image source={{uri : selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <BoldText>{selectedMeal.duration} Min.</BoldText>
                <BoldText>{selectedMeal.complexity.toUpperCase()}</BoldText>
                <BoldText>{selectedMeal.affordability.toUpperCase()}</BoldText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((ingrediant, i) =>
                <ListItem key={ingrediant}>
                   {ingrediant}
                </ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((step, i) =>
            <ListItem key={step}>
                   {step}
            </ListItem>)}
        </ScrollView>
    )
}



MealDetailScreen.navigationOptions = (navigationData) => {

    //const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    const toggleFavourite = navigationData.navigation.getParam('toggleFav')
    const isFavourite = navigationData.navigation.getParam('isFav')
    return {
        headerTitle: mealTitle,
        headerRight : () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title={'Favourite'} iconName={isFavourite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavourite}/>
        </HeaderButtons>,
        headerStyle : {
            backgroundColor : Platform.OS === 'android' ? Colors.accentColor : '',
        },
    }
}

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 200,
    },
    details : {
        flexDirection : 'row',
        padding : 15,
        justifyContent : 'space-around',
    },
    title : {
        fontFamily : 'open-sans-bold',
        textAlign : 'center',
    },
    listItem : {
        marginVertical : 10,
        marginHorizontal : 20,
        borderColor : '#ccc',
        borderWidth : 1,
        borderRadius : 5,
        padding: 10,
    }
})

export default MealDetailScreen