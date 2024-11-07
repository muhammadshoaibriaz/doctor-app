import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

export default function Signup() {
  const navigation = useNavigation();
  const [phone_number, setPhoneNumber] = useState("");

  const generateOTP = (length) => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  // Usage
  const otpCode = generateOTP(4); // Generate a 4-digit OTP
  // console.log("Generated OTP:", otpCode);
  const createUser = async () => {
    if (!phone_number.trim()) {
      ToastAndroid.show("Please enter you phone number!", 2000);
    } else if (phone_number.trim().length < 10) {
      ToastAndroid.show("Invalid phone number!", 2000);
    } else {
      navigation.navigate("MPin", { otpCode, phone_number });
    }
    // navigation.navigate("Availability");
  };
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 14,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Text
          style={{ fontFamily: "MontserratBold", fontSize: 20 }}
          onPress={async () => {
            const tokens = await AsyncStorage.getItem("userType");
            // const tokens = await AsyncStorage.removeItem("userType");
            console.log(tokens);
          }}
        >
          Let's Get Started!
        </Text>
        <Text style={{ fontFamily: "MontserratRegular", fontSize: 14 }}>
          We need your phone number to identify you
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.input_bar}>
            <Text style={[styles.text]}>🇵🇰 PK +92 </Text>
            <TextInput
              value={phone_number}
              keyboardType="phone-pad"
              onChangeText={(value) => setPhoneNumber(value)}
              placeholder="324 5465345"
              style={[styles.input]}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
            width: "100%",
            marginBottom: 5,
            fontFamily: "MontserratRegular",
          }}
        >
          Using this app implies your agreement to HotDoc's:
        </Text>
        <Text style={{ color: "teal", fontFamily: "MontserratRegular" }}>
          Terms of Service
        </Text>
        <Text
          style={{
            marginBottom: 10,
            marginTop: 10,
            fontFamily: "MontserratRegular",
          }}
        >
          Your information is kept confidential and never shared without consent
        </Text>
        <TouchableOpacity
          style={{ paddingBottom: 10 }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "MontserratMedium",
            }}
          >
            Already have an account?{" "}
            <Text style={{ color: "teal" }}>Login</Text>
          </Text>
        </TouchableOpacity>
        <TouchableHighlight style={styles.continue} onPress={createUser}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "MontserratMedium",
            }}
          >
            Send Verification Code
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "MontserratMedium",
  },
  continue: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "teal",
    borderRadius: 6,
    marginTop: 20,
    bottom: 10,
  },
  input: {
    width: "80%",
    height: 35,
    fontFamily: "MontserratMedium",
    paddingLeft: 8,
  },
  input_bar: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBlockColor: "#ddd",
  },
});
