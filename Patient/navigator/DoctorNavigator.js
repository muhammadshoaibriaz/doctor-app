import React, { useEffect, useState } from "react";
import { TabStack } from "../doctor/components/navigator/TabNavigator";
import { SwitchNavigator } from "../doctor/components/navigator/SwitchNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const DoctorNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!userToken);
    };
    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor="#f8f8f8" />
      {isAuthenticated ? <TabStack /> : <SwitchNavigator />}
    </NavigationContainer>
  );
};
export { DoctorNavigator };
