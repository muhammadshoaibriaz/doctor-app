import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { Component, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
export default function Splash() {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    MontserratLight: require("../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "MontserratMedium" }}>Loading...</Text>
      </View>
    );
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("username");
        navigation.replace(user ? "Login" : "SignUp");
      } catch (error) {
        console.log("Error retrieving user data ", error);
      }
    };
    const timer = setTimeout(checkUser, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animatable.Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 300, height: 200 }}
        resizeMode="contain"
        animation={"fadeInDown"}
      />
      <Animatable.Text
        animation={"fadeInUp"}
        style={{
          fontSize: 30,
          fontFamily: "MontserratBold",
          marginTop: 10,
        }}
      >
        {" "}
        HotDoc{" "}
      </Animatable.Text>
    </View>
  );
}
