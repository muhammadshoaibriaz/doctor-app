import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Switch } from "react-native-paper";

export default function Button({ onPress, title, icon }) {
  const [on, setOn] = useState(false);
  return (
    <TouchableHighlight
      style={{ marginTop: 10 }}
      underlayColor="#f9f9f9"
      onPress={onPress}
    >
      <View style={styles.rows}>
        <View style={[styles.switch]}>
          <Ionicons name={icon} size={26} />
          <Text
            style={{
              marginLeft: 10,
              fontFamily: "MontserratMedium",
              fontSize: 15,
            }}
          >
            {title}
          </Text>
        </View>
        <View style={styles.switch}>
          <Ionicons name="chevron-forward-outline" color={"#ccc"} size={18} />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    alignItems: "center",
  },
  rows: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: 12,
  },
});
