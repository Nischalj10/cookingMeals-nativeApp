import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform
, ImageBackground} from "react-native";
import BoldText from "./BoldText";

const MealItems = props => {

    let Touchable = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback
    }

    return(
        <View style={styles.mealItem}>
        <Touchable onPress={props.onPress}>
            <View>
                <View style={{...styles.mealRow, ...styles.mealHeader}}>
                    <ImageBackground source={{uri : props.itemData.item.imageUrl}}
                    style={styles.bgImage}>
                        <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>{props.itemData.item.title}</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={{...styles.mealRow, ...styles.mealDetail}}>
                    <BoldText>{props.itemData.item.duration} Min.</BoldText>
                    <BoldText>{props.itemData.item.complexity.toUpperCase()}</BoldText>
                    <BoldText>{props.itemData.item.affordability.toUpperCase()}</BoldText>
                </View>
            </View>
        </Touchable>
        </View>
    )
}

const styles = StyleSheet.create({
    mealItem : {
        height : 200,
        width : '100%',
        backgroundColor : 'rgba(0,0,0,0.08)',
        borderRadius : 15,
        overflow : 'hidden',
        marginBottom : 20,
    },
    mealRow : {
        flexDirection : 'row',
    },

    mealHeader : {
        height: '85%',
    },
    mealDetail : {
        paddingHorizontal : 20,
        justifyContent : 'space-between',
        alignItems : 'center',
        height : '15%'
    },
    bgImage : {
        height : '100%',
        width: "100%",
        justifyContent: 'flex-end',
    },
    titleContainer : {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical : 5,
        paddingHorizontal: 12,
    },
    title : {
        fontFamily : 'open-sans-bold',
        fontSize : 20,
        color : 'white',
        textAlign : 'center',
    }
})

export default MealItems