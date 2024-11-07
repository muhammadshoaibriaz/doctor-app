import { AntDesign, Ionicons } from "@expo/vector-icons";
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
const ITEM_WIDTH = width / 3;
const ITEM_HEIGHT = ITEM_WIDTH * 1.6;

export default function DoctorView({
  name,
  image,
  specialist,
  description,
  totalPatient,
  experience,
  rating,
  reviews,
  onPress,
  status,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          resizeMode: "cover",
          alignSelf: "center",
          backgroundColor: "#eee",
          height: 120,
          borderRadius: 10,
        }}
      />
      <View style={styles.details}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.name}>
            {name?.length > 11 ? name?.slice(0, 11) + "..." : name}
          </Text>
          {status === "accepted" && (
            <Image
              source={require("../../assets/images/verified.png")}
              style={{
                width: 14,
                resizeMode: "contain",
                height: 14,
                marginLeft: 2,
                tintColor: "teal",
              }}
            />
          )}
        </View>
        <Text numberOfLines={1} style={styles.specialist}>
          {specialist}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text style={styles.description}>
            <Ionicons name="location-outline" size={8} />
            {reviews}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: "MontserratMedium",
            }}
          >
            <AntDesign name="staro" size={10} color="orange" />
            {rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: "auto",
    flexDirection: "column",
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 5,
  },
  details: {
    paddingHorizontal: 5,
    paddingTop: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: "MontserratMedium",
  },
  specialist: {
    fontSize: 10,
    fontFamily: "MontserratMedium",
    opacity: 0.4,
  },

  description: {
    fontSize: 10,
    fontFamily: "MontserratMedium",
  },
});
