import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Notify({ onPress, title, notify, icon, time }) {
  return (
    <View
      style={{
        marginHorizontal: 14,
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#eeeeee90",
        marginBottom: 8,
      }}
    >
      <Ionicons name="alarm-outline" color={"teal"} size={16} />
      <View style={{ paddingLeft: 6 }}>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 14,
          }}
        >
          {title} <Text style={{ fontSize: 10, color: "teal" }}>{time}</Text>
        </Text>
        <Text
          style={{
            fontFamily: "MontserratRegular",
            fontSize: 14,
            width: 280,
          }}
        >
          {notify}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
});
