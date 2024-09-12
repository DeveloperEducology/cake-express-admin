import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, StatusBar } from "react-native";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import store from "./src/redux/store";
import AuthStack from "./src/navigation/AuthStack";
import MainStack from "./src/navigation/MainStack";
import AppNavigator from "./src/navigation/AppNavigator";
import { saveUserData } from "./src/redux/reducers/auth";
import { getData } from "./src/utils/helperFunctions";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { dispatch } = store;

export default function App() {
  React.useEffect(() => {
    initUser();
  }, []);
  
  const initUser = async () => {
    try {
      let data = await getData("userData");
      console.log("stored data", data);
      if (!!data) {
        dispatch(saveUserData(JSON.parse(data)));
      }
    } catch (error) {
      console.log("no data found");
    }
  };
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar  />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
