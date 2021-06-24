import React from "react";
import {FlatList,View, StyleSheet} from "react-native";
import MealItems from "./MealItems";

const MealList = props => {

    const renderMealItem = itemData => {
        return(<MealItems itemData={itemData}
                          onPress={() => props.navigation.navigate({routeName : 'MealDetail',
                              params : {
                                  mealId : itemData.item.id,
                                  mealTitle : itemData.item.title,
                              }})}/>)
    }

    return (
        <View style={styles.list}>
            <FlatList data={props.listData}
                      renderItem={renderMealItem}
                      style={{width : '95%', margin: 10}}      />
        </View>
    )
}

const styles = StyleSheet.create({
    list : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    }
})

export default MealList