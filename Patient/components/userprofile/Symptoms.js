import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Symptoms({ image, name, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.category}
      onPress={onPress}
    >
      <Image
        source={image}
        style={{
          width: 26,
          height: 26,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          fontFamily: "MontserratMedium",
          fontSize: 8,
          textAlign: "center",
          marginTop: 4,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  category: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
});
