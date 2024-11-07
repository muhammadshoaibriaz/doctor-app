import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
export default function Splash() {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    MontserratLight: require("../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!loaded) {
    return <Text>Loading...</Text>;
  }
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 4000);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar translucent />
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

const styles = StyleSheet.create({});
