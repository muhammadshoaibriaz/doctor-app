import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Category({ image, name, onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.category, style]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Image
        source={image}
        style={{
          width: 45,
          height: 45,
          resizeMode: "contain",
        }}
      />
      <View style={{ marginLeft: 12 }}>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 14,
            marginBottom: 2,
          }}
        >
          {name}
        </Text>
        <Text
          style={{ fontFamily: "MontserratMedium", fontSize: 12, opacity: 0.5 }}
        >
          See all doctors
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          opacity: 0.2,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  category: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    height: 70,
  },
});
