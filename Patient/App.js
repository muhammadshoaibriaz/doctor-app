import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "./redux/store/store";
import {
  OnboardingNav,
  PatientNavigator,
} from "./components/navigator/AppNavigator";
import { DoctorNavigator } from "./navigator/DoctorNavigator";
import SelectionScreen from "./SelectionScreen";

export default function App() {
  const [userType, setUserType] = useState(null);
  const [fontsLoaded] = useFonts({
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
  });
  const [userExist, setUserExist] = useState("");

  useEffect(() => {
    const loadUserType = async () => {
      const userToken = await AsyncStorage.getItem("userExistToken");
      const savedUserType = await AsyncStorage.getItem("userType");
      if (savedUserType) {
        setUserType(savedUserType);
      }
      setUserExist(userToken);
    };
    loadUserType();
  }, []);

  const handleSetUserType = async (type) => {
    setUserType(type);
    await AsyncStorage.setItem("userType", type);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Provider store={store}>
      {!userExist ? (
        <NavigationContainer>
          <OnboardingNav />
        </NavigationContainer>
      ) : !userType ? (
        <SelectionScreen onPress={handleSetUserType} />
      ) : userType === "doctor" ? (
        <DoctorNavigator />
      ) : (
        <NavigationContainer>
          <PatientNavigator />
        </NavigationContainer>
      )}
    </Provider>
  );
}
