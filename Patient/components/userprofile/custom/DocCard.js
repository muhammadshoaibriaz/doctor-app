import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width / 3;
export default function DocCard({
  onPress,
  image,
  doctor_name,
  specialist,
  description,
  patients,
  experience,
  rating,
  reviews,
  status,
}) {
  return (
    <TouchableOpacity
      style={[styles.card]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: ITEM_WIDTH,
          height: "100%",
          resizeMode: "cover",
          backgroundColor: "#eee",
          // backgroundColor: "red",
        }}
      />
      <View style={styles.details}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.name}>
            {doctor_name?.length > 16
              ? doctor_name.slice(0, 16) + "..."
              : doctor_name}
          </Text>
          {status === "accepted" && (
            <Image
              source={require("../../../assets/images/verified.png")}
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
        <Text style={styles.specialist}>{specialist}</Text>
        <Text
          numberOfLines={3}
          style={[styles.description, { paddingRight: 5 }]}
        >
          {description}
        </Text>
        <View style={styles.docDetails}>
          <View style={styles.box}>
            <Text style={styles.patient}>Patients</Text>
            <Text style={styles.title}>
              {!patients ? Math.floor(Math.random() * 30) : patients}+
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.patient}>Experience</Text>
            <Text style={styles.title}>
              {!experience ? 2 : experience}+ years
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.patient}>Rating</Text>
            <Text style={styles.title}>{rating}+</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.likeHeart} onPress={() => {}}>
          <Ionicons name="ellipsis-vertical-sharp" size={16} color={"teal"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 10,
    height: 150,
    flexDirection: "row",
    overflow: "hidden",
    marginHorizontal: 14,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
  },
  specialist: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
    opacity: 0.4,
  },
  patient: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
  },
  description: {
    fontSize: 12,
    width: 200,
    fontFamily: "MontserratMedium",
    marginTop: 5,
  },
  title: {
    fontSize: 12,
    fontFamily: "MontserratBold",
    marginTop: 5,
  },
  docDetails: {
    width: 190,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  likeHeart: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 8,
    // backgroundColor: "red",
  },
  btn: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
