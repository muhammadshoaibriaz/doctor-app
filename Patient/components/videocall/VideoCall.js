import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native";

export default function VideoCall() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign name="lock1" size={12} color={"#333"} />
      <Text style={{ fontFamily: "Montserrat" }}> End-to-end encrypted </Text>
      <View style={{ alignSelf: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "MontserratRegular", fontSize: 22 }}>
          Fayyaz Bhai{" "}
        </Text>
      </View>
      <View style={styles.bottomCard}>
        <TouchableOpacity style={styles.iconBtn}>
          <FontAwesome name="file-pdf-o" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <FontAwesome name="file-movie-o" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <FontAwesome name="microphone-slash" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <FontAwesome name="phone" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomCard: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    height: 90,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "teal",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconBtn: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
