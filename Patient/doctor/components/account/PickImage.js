import React, { Component, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function PickImage({ route }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 14,
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        style={{
          position: "relative",
          width: 40,
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "MontserratMedium",
          fontSize: 24,
          marginBottom: 10,
        }}
      >
        Complete your profile 🗓
      </Text>
      <Text style={{ fontSize: 16, fontFamily: "MontserratRegular" }}>
        Don't worry only you can see your personal details. No one will be able
        to see you
      </Text>
      <Text style={{ fontSize: 16, fontFamily: "MontserratRegular" }}>
        {doctors.map((item, index) => (
          <Text>{item.username}</Text>
        ))}
      </Text>
      <TouchableOpacity
        style={[
          styles.touchableBtn,
          {
            backgroundColor: "teal",
            alignSelf: "center",
            marginTop: 30,
            width: "100%",
          },
        ]}
        onPress={fetchData}
      >
        <Text
          style={[
            styles.text,
            { color: "#fff", fontFamily: "MontserratMedium" },
          ]}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchableBtn: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 30,
    width: 280,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    position: "absolute",
    bottom: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    fontFamily: "Montserrat1",
    marginLeft: 10,
  },
  input: {
    fontFamily: "Montserrat",
    height: 45,
    fontSize: 15,
    borderBottomColor: "#a1614b",
    borderBottomWidth: 1,
  },
  penBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 58,
    left: 25,
    backgroundColor: "teal",
    borderRadius: 50,
  },
});
