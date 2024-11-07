import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

export default function SelectionScreen({ onPress }) {
  const [userExist, setUserExist] = useState("");
  const [userType, setUserType] = useState(null);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar translucent />
      <Image
        source={require("./assets/images/logo.png")}
        style={styles.image}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratRegular",
            marginBottom: 2,
            fontSize: 16,
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            fontFamily: "MontserratBold",
            fontSize: 34,
            marginBottom: 20,
          }}
          onPress={async () => {
            const tokens = await AsyncStorage.getAllKeys();
            console.log(tokens);
          }}
        >
          HotDoc
        </Text>
      </View>
      <TouchableHighlight
        underlayColor="#eee"
        style={[styles.continue, { backgroundColor: "white" }]}
        onPress={() => onPress("doctor")}
      >
        <Text
          style={{
            color: "#111",
            fontSize: 16,
            fontFamily: "MontserratMedium",
          }}
        >
          Continue as Doctor
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.continue}
        onPress={() => onPress("patient")}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "MontserratMedium",
          }}
        >
          Continue as Patient
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 240,
    height: 240,
    resizeMode: "cover",
    borderRadius: 100,
    alignSelf: "center",
  },
  continue: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "teal",
    borderRadius: 6,
    marginTop: 20,
    width: "60%",
  },
  input: {
    width: "100%",
    height: 34,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 14,
    fontFamily: "MontserratRegular",
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
  },
});
