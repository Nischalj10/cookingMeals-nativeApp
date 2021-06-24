import React from "react";
import {View, Text, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Platform} from "react-native";

const CategoryGridTile = props => {
    let Touchable = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
        <Touchable onPress={props.onPress}>
            <View style={{...styles.container, ...{backgroundColor : props.color}}}>
                <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
            </View>
        </Touchable>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem : {
        flex : 1,
        margin : 15,
        height : 150,
        borderRadius: 10,
        elevation : 15,
        overflow : Platform.OS==='android' && Platform.Version >=21 ? 'hidden' : 'visible',
        shadowColor : 'black',
        shadowOpacity: 0.26,
        shadowOffset : {width : 0, height: 2},
        shadowRadius : 10,
    },
    container : {
        flex : 1,
        borderRadius : 10,
        padding : 15,
        justifyContent : 'flex-end',
        alignItems : 'flex-end',
    },
    title : {
        fontFamily : 'open-sans-bold',
        fontSize : 18,
        textAlign : 'right'
    }
})

export default CategoryGridTile