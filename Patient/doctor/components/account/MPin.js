import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ToastAndroid,
} from "react-native";

export default function MPin({ route }) {
  const navigation = useNavigation();
  const { phone_number, otpCode } = route.params;
  // console.log("phone_number", phone_number);
  let [timer, setTimer] = useState(60);
  const [pin1, setPin1] = useState(otpCode[0]);
  const [pin2, setPin2] = useState(otpCode[1]);
  const [pin3, setPin3] = useState(otpCode[2]);
  const [pin4, setPin4] = useState(otpCode[3]);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer == 0) {
        clearInterval(() => interval);
      } else {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 14 }}>
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
            Confirm pin
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontFamily: "MontserratRegular" }}>
            Enter the 4-digit code we sent over SMS to{" "}
            <Text style={{ fontFamily: "MontserratMedium" }}>
              '{phone_number}'
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              margin: 4,
              marginTop: 40,
            }}
          >
            <TextInput
              ref={ref1}
              value={pin1}
              autoComplete="sms-otp"
              onChangeText={(val) => {
                setPin1(val);
                if (pin1 != "null") {
                  ref2.current.focus();
                }
              }}
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              ref={ref2}
              value={pin2}
              onChangeText={(val) => {
                setPin2(val);
                if (pin2 != "null") {
                  ref3.current.focus();
                }
              }}
              autoComplete="sms-otp"
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              ref={ref3}
              value={pin3}
              onChangeText={(val) => {
                setPin3(val);
                if (pin3 != "null") {
                  ref4.current.focus();
                }
              }}
              autoComplete="sms-otp"
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              ref={ref4}
              value={pin4}
              onChangeText={(val) => {
                setPin4(val);
              }}
              autoComplete="sms-otp"
              maxLength={1}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={{ color: "teal", fontFamily: "MontserratMedium" }}>
              Send again after{" "}
              {timer > 0 ? (
                timer + "s"
              ) : (
                <Text onPress={() => setTimer(60)} style={{ color: "red" }}>
                  Resend OTP
                </Text>
              )}
            </Text>
          </View>
        </View>
        <View>
          <TouchableHighlight
            style={styles.continue}
            onPress={() => {
              if (otpCode === pin1 + pin2 + pin3 + pin4) {
                navigation.navigate("Profile", { phone_number });
              } else {
                ToastAndroid.show("Invalid OTP code", 3000);
              }
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontFamily: "MontserratMedium",
              }}
            >
              Verify
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 50,
    borderRadius: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 4,
    fontSize: 18,
    fontFamily: "MontserratRegular",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  continue: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "teal",
    borderRadius: 6,
    bottom: 10,
  },
});
