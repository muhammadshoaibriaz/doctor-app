import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width / 3;

export default function DoctorCard({
  onPress,
  description,
  review,
  rating,
  image,
  doctor_name,
  specialist,
  bio,
  patients,
  experience,
  iconName,
  onIconPress,
  status,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={image}
        style={{
          width: ITEM_WIDTH,
          height: "100%",
          resizeMode: "cover",
          backgroundColor: "#eee",
        }}
      />
      <View style={styles.details}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.name}>{doctor_name || "Shoaib Raiz"}</Text>
          {status === "accepted" && (
            <Image
              source={require("../../../assets/images/verified.png")}
              style={{ width: 15, height: 15, tintColor: "teal" }}
            />
          )}
        </View>
        <Text style={styles.specialist}>{specialist || "Cardiologist"}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {bio}
        </Text>
        <View style={styles.docDetails}>
          <View style={styles.box}>
            <Text style={styles.patient}>Patients</Text>
            <Text style={styles.title}>{patients}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.patient}>Experience</Text>
            <Text style={styles.title}>{experience}+ years</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.patient}>Rating</Text>
            <Text style={styles.title}>{rating}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.likeHeart} onPress={onIconPress}>
          <Ionicons name={iconName} size={16} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 10,
    height: 140,
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
    top: 2,
    right: 10,
  },
});
