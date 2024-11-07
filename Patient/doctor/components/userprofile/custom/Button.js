import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Switch } from "react-native-paper";

export default function Button({ title, onChange, value }) {
  return (
    <View style={styles.customButton}>
      <Text
        style={{
          fontFamily: "MontserratMedium",
          fontSize: 15,
        }}
      >
        {title}
      </Text>
      <Switch color="teal" value={value} onChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  customButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
});
