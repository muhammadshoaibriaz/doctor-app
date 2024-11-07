import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Category({ image, name, onPress }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.category}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Image
        source={image}
        style={{
          width: 40,
          height: 40,
          resizeMode: "contain",
        }}
      />
      <Text style={{ fontFamily: "MontserratMedium", fontSize: 10 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  category: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
});
