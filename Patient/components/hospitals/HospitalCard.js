import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.75;

export default function HospitalCard({
  onPress,
  hosName,
  rating,
  doctors,
  location,
  image,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.hosCard}
    >
      <Image source={image} style={styles.image} />
      <View style={{ marginTop: 10, padding: 4 }}>
        <Text style={styles.hosName}> {hosName} </Text>
        <Text style={styles.subtitle}> {doctors} doctors available </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 14,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.subtitle}> {rating} </Text>
            <Ionicons name="star-outline" color={"orange"} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Ionicons name="location-outline" />
            <Text
              numberOfLines={1}
              style={[
                styles.subtitle,
                {
                  width: "100%",
                },
              ]}
            >
              {" "}
              {location}{" "}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hosCard: {
    width: ITEM_WIDTH,
    height: "auto",
    padding: 6,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginRight: 14,
  },
  image: {
    width: "100%",
    height: ITEM_WIDTH * 0.6,
    borderRadius: 10,
  },
  hosName: {
    fontSize: 15,
    fontFamily: "MontserratMedium",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
    opacity: 0.5,
  },
});
