import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Animated,
  LayoutAnimation,
  ToastAndroid,
} from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "../userprofile/custom/Button";
export default function Service({ route }) {
  const {
    phone_number,
    bio,
    name,
    email,
    password,
    gender,
    dateOfBirth,
    workingSince,
    image,
    specialist,
    documents,
  } = route.params;
  // console.log(
  //   "updatedData ",
  //   phone_number,
  //   bio,
  //   name,
  //   email,
  //   gender,
  //   dateOfBirth,
  //   workingSince,
  //   image,
  //   specialist,
  //   documents
  // );
  const navigation = useNavigation();

  // doctor fees states
  const [videoConversationFee, setVideoConversationFee] = useState("");
  const [videoCallFee, setVideoCallFee] = useState("");
  const [textFee, setTextFee] = useState("");
  const [visitFee, setVisitFee] = useState("");
  const [phoneCallFee, setPhoneCallFee] = useState("");

  const [video_consultation, set_video_consultation] = useState(false);
  const [phone_call, set_phone_call] = useState(false);
  const [text_conversation, set_text_conversation] = useState(false);
  const [actual_visit, set_actual_visit] = useState(false);
  const [video_call, set_video_call] = useState(false);

  const video_consultationAnim = () => {
    LayoutAnimation.easeInEaseOut();
    set_video_consultation(!video_consultation);
  };
  const phone_callAnim = () => {
    LayoutAnimation.easeInEaseOut();
    set_phone_call(!phone_call);
  };
  const actual_visitAnim = () => {
    LayoutAnimation.easeInEaseOut();
    set_actual_visit(!actual_visit);
  };
  const text_conversationAnim = () => {
    LayoutAnimation.easeInEaseOut();
    set_text_conversation(!text_conversation);
  };
  const video_callAnim = () => {
    LayoutAnimation.easeInEaseOut();
    set_video_call(!video_call);
  };

  const handleServices = () => {
    try {
      if (
        video_consultation === false &&
        phone_call === false &&
        actual_visit === false &&
        video_call === false &&
        text_conversation === false &&
        !phoneCallFee &&
        !videoCallFee &&
        !video_consultation &&
        !videoConversationFee &&
        !textFee
      ) {
        // console.log("false");
        ToastAndroid.show(
          "Please choose at least one service to continue!",
          ToastAndroid.LONG
        );
      } else {
        // console.log("true");
        navigation.navigate("Availability", {
          phone_number,
          bio,
          name,
          email,
          password,
          gender,
          dateOfBirth,
          workingSince,
          image,
          specialist,
          documents,
          videoCallFee,
          textFee,
          visitFee,
          phoneCallFee,
          videoCallFee,
          video_consultation,
          phone_call,
          text_conversation,
          actual_visit,
          video_call,
          videoConversationFee,

          // const [videoConversationFee, setVideoConversationFee] = useState("");
          // const [videoCallFee, setVideoCallFee] = useState("");
          // const [textFee, setTextFee] = useState("");
          // const [visitFee, setVisitFee] = useState("");
          // const [phoneCallFee, setPhoneCallFee] = useState("");
        });
      }
    } catch (error) {
      console.log("Error choosing  service", error);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: 14 }}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Feather name="chevron-left" size={24} />
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 20,
              marginLeft: 10,
            }}
          >
            Service type
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "MontserratMedium" }}></Text>
      </View>
      <Button
        value={video_consultation}
        onChange={() => video_consultationAnim()}
        title={"Video consultation"}
      />
      {video_consultation && (
        <Animated.View
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.pricing}>
            <Text style={styles.text}>Consultation Fees</Text>
            <TextInput
              value={videoConversationFee}
              onChangeText={(text) => setVideoConversationFee(text)}
              placeholder="Rs: 300"
              style={styles.input}
            />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
          <View style={styles.pricing}>
            <Text style={styles.text}>For</Text>
            <TextInput placeholder="/ 20 minutes" style={styles.input} />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
        </Animated.View>
      )}
      <Button
        value={text_conversation}
        onChange={() => text_conversationAnim()}
        title={"Text Conversation"}
      />
      {text_conversation && (
        <Animated.View
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.pricing}>
            <Text style={styles.text}>Consultation Fees</Text>
            <TextInput
              value={textFee}
              onChangeText={(text) => setTextFee(text)}
              placeholder="Rs: 300"
              style={styles.input}
            />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
          <View style={styles.pricing}>
            <Text style={styles.text}>For</Text>
            <TextInput placeholder="/ 20 minutes" style={styles.input} />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
        </Animated.View>
      )}
      <Button
        value={video_call}
        onChange={() => video_callAnim()}
        title={"Video Call"}
      />
      {video_call && (
        <Animated.View
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.pricing}>
            <Text style={styles.text}>Consultation Fees</Text>
            <TextInput
              value={videoCallFee}
              onChangeText={(text) => setVideoCallFee(text)}
              placeholder="Rs: 300"
              style={styles.input}
            />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
          <View style={styles.pricing}>
            <Text style={styles.text}>For</Text>
            <TextInput placeholder="/ 20 minutes" style={styles.input} />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
        </Animated.View>
      )}
      <Button
        value={actual_visit}
        onChange={() => actual_visitAnim()}
        title={"Actual Visit"}
      />
      {actual_visit && (
        <Animated.View
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.pricing}>
            <Text style={styles.text}>Consultation Fees</Text>
            <TextInput
              value={visitFee}
              onChangeText={(text) => setVisitFee(text)}
              placeholder="Rs: 300"
              style={styles.input}
            />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
          <View style={styles.pricing}>
            <Text style={styles.text}>For</Text>
            <TextInput placeholder="/ 20 minutes" style={styles.input} />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
        </Animated.View>
      )}
      <Button
        value={phone_call}
        onChange={() => phone_callAnim()}
        title={"Phone Call"}
      />
      {phone_call && (
        <Animated.View
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.pricing}>
            <Text style={styles.text}>Consultation Fees</Text>
            <TextInput
              value={phoneCallFee}
              onChangeText={(text) => setPhoneCallFee(text)}
              placeholder="Rs: 300"
              style={styles.input}
            />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
          <View style={styles.pricing}>
            <Text style={styles.text}>For</Text>
            <TextInput placeholder="/ 20 minutes" style={styles.input} />
            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>
              Fixed price
            </Text>
          </View>
        </Animated.View>
      )}
      <TouchableHighlight style={styles.continue} onPress={handleServices}>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "MontserratMedium",
            marginLeft: 8,
            bottom: 1,
          }}
        >
          Next
        </Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontFamily: "MontserratMedium",
    marginTop: 10,
  },
  pricing: {
    width: "45%",
  },

  continue: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "teal",
    borderRadius: 6,
    marginHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  text: {
    fontFamily: "MontserratRegular",
  },
});
