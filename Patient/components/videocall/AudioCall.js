import {
  AntDesign,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import { count } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import { Modal, TextInput } from "react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dialog } from "react-native-elements";
import { AirbnbRating, Rating } from "react-native-ratings";
import { IP_ADDRESS } from "../../db/IP";

export default function AudioCall({ route }) {
  const { data, user } = route.params;
  // console.log("data user", user);
  const { email, username, avatar } = user;
  // console.log(data?._id);

  const [vColor, setVColor] = useState(false);
  const [pColor, setPColor] = useState(false);
  const [mColor, setMColor] = useState(false);
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  const sendRating = async () => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/api/doc/reviews`, {
        rating,
        review,
        patientEmail: email,
        patientName: username,
        patientImg: avatar,
        doctorId: data?._id,
      });
      console.log(response.data);
      setReview("");
      setVisible(false);
    } catch (error) {
      console.log("Error posting rating ");
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `${IP_ADDRESS}/api/doc/reviews/${data?._id}`
      );
      // console.log(response.data);
    } catch (err) {
      console.log("Error getting reviews", err.message);
    }
  };
  getReviews();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#016565",
      }}
    >
      <StatusBar translucent={false} style="light" backgroundColor="#016565" />
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/tolgamendi.jpg")}
          style={styles.image}
        />
        <Text style={styles.userName}>Tolga Mendi</Text>
        <Text style={styles.text}>12:04</Text>
      </View>
      <View style={styles.bottomBtn}>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: vColor ? "#018a8a" : "transparent" },
          ]}
          onPress={() => setVColor(!vColor)}
        >
          <FontAwesome
            name="volume-up"
            color={vColor ? "#fff" : "#222"}
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              bottom: 30,
              elevation: 10,
            },
          ]}
          onPress={() => {
            setPColor(!pColor);
            // navigation.goBack();
            setVisible(true);
          }}
        >
          <Fontisto
            name="phone"
            color={pColor ? "#111" : "#ff0000"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: mColor ? "#018a8a" : "transparent" },
          ]}
          onPress={() => setMColor(!mColor)}
        >
          <FontAwesome
            name="microphone-slash"
            color={mColor ? "#fff" : "#222"}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <Dialog
        visible={visible}
        animationType="fade"
        statusBarTranslucent={true}
        overlayStyle={{
          padding: 0,
          width: 320,
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Write Review</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <AntDesign name="close" color="#444" size={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              placeholder="Write review here..."
              style={styles.input}
              multiline
              onChangeText={(text) => setReview(text)}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.modalFooter}>
            <AirbnbRating
              count={5}
              reviews={[
                "Terrible",
                "Bad",
                "Meh",
                "OK",
                "Good",
                "Hmm...",
                "Very Good",
                "Wow",
                "Amazing",
                "Unbelievable",
                "Jesus",
              ]}
              defaultRating={rating}
              size={26}
              reviewColor="#444"
              showRating={false}
              onFinishRating={(val) => setRating(val)}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={sendRating}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "teal",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  btn: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },
  userName: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
    marginTop: 10,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
  modal: {
    width: "100%",
    height: 400,
    paddingHorizontal: 14,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  modalBody: {
    marginTop: 8,
  },
  input: {
    width: "100%",
    height: 200,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    fontFamily: "MontserratRegular",
  },
  modalFooter: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtn: {
    width: "90%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  btnText: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
    color: "#fff",
  },
});
