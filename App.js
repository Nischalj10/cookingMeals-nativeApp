import React, {useEffect} from 'react';
import {LogBox} from "react-native";
import {useFonts} from 'expo-font'
import AppLoading from "expo-app-loading";
import MealsNavigator from "./navigation/MealsNavigator";
import {enableScreens} from 'react-native-screens'
import {createStore,combineReducers} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";

import mealsReducer from "./store/reducers/meals";

enableScreens();

const rootReducer = combineReducers({
    meals : mealsReducer
})

const store = createStore(rootReducer, composeWithDevTools());

export default function App() {

    useEffect(() => {
        LogBox.ignoreAllLogs();
    })

    const [loaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });

    if (!loaded) {
        return <AppLoading onError={err => console.log(err)}/>
    }

  return (
    <Provider store={store}>
      <MealsNavigator/>
    </Provider>
  );
}


