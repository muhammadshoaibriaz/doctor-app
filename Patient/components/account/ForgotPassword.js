import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-elements";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const handleSubmit = () => {
    console.log("Submitted");
  };
  return (
    <View style={{ paddingHorizontal: 14 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 16,
            marginRight: 10,
          }}
        >
          Recovery Password
        </Text>
        <View></View>
      </View>
      <Text
        style={{
          fontFamily: "MontserratRegular",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Enter your new and confirm your password.
      </Text>
      <TextInput
        style={styles.inputBar}
        placeholder="New Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.inputBar}
        placeholder="Confirm New Password"
        secureTextEntry={true}
      />
      <TouchableHighlight
        style={styles.continue}
        onPress={() => {
          handleSubmit();
          navigation.navigate("MPin");
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "MontserratMedium",
          }}
        >
          Reset
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBar: {
    width: "90%",
    height: 50,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    fontFamily: "MontserratMedium",
  },
  header: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBtn: {
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
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
  },
});
