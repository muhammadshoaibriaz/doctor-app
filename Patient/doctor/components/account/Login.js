import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import BottomSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP_ADDRESS } from "../../../db/IP";
export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bottomRef = useRef();
  const handleLoginFunc = async () => {
    try {
      if (!email || !password) {
        ToastAndroid.show("Invalid credential!", ToastAndroid.LONG);
        return;
      } else {
        const response = await axios.post(`${IP_ADDRESS}/api/doc/login`, {
          email,
          password,
        });
        let data = response.data;
        navigation.replace("Tabs", data);
        if (response.status === 200) {
          // Alert.alert("Login Successful", data.message);
          console.log("data", data);
          // Optionally, you can navigate to the next screen or perform any other actions upon successful login
        } else {
          Alert.alert("Login Failed", data.error);
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "An error occurred while trying to log in. Please try again later."
      );
    }
  };

  const [pass, setPass] = useState(false);
  const togglePass = () => {
    setPass(!pass);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      <Animatable.View
        animation={"fadeIn"}
        duration={2000}
        style={{ marginTop: 100 }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
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
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontFamily: "MontserratBold",
              fontSize: 24,
              marginBottom: 20,
            }}
            onPress={async () => {
              // alert(await AsyncStorage.getItem("username"));
              await AsyncStorage.removeItem("userType");
            }}
          >
            HotDoc
          </Text>
          <Text style={{ fontFamily: "MontserratRegular", fontSize: 8 }}>
            Doctor login
          </Text>
        </View>
      </Animatable.View>

      <BottomSheet
        closeOnDragDown={true}
        closeOnPressBack
        closeOnPressMask
        animationType="fade"
        height={240}
        ref={bottomRef}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: -30,
          },
          wrapper: {
            backgroundColor: "#11111120",
          },
        }}
      >
        <View
          style={{
            paddingHorizontal: 14,
            height: "80%",
          }}
        >
          <Text
            style={{
              fontFamily: "MontserratMedium",
              marginTop: 20,
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Enter your email to reset your password!
          </Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[
              styles.inputBar,
              {
                height: 40,
                color: "#3e3e3e",
                flex: 0,
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
                fontFamily: "MontserratMedium",
                marginTop: 20,
              },
            ]}
            placeholder="abc@gmail.com"
            keyboardType="email-address"
          />
          <TouchableHighlight
            style={styles.continue}
            onPress={() => {
              // handleReset();
              // navigation.navigate("MPin");
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontFamily: "MontserratMedium",
              }}
            >
              Reset Password
            </Text>
          </TouchableHighlight>
        </View>
      </BottomSheet>

      <Animatable.View
        animation={"fadeIn"}
        duration={2000}
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 20,
            marginBottom: 10,
          }}
          onPress={async () => {
            await AsyncStorage.clear();
          }}
        >
          Signup or Login
        </Text>
        <Text style={{ fontFamily: "MontserratRegular", marginBottom: 5 }}>
          Enter your email and password to login
        </Text>
        <View style={styles.input}>
          <Ionicons name="mail-outline" size={20} />
          <TextInput
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Email"
            style={styles.inputBar}
          />
        </View>
        <View style={styles.input}>
          <Ionicons name="lock-closed-outline" size={20} />
          <TextInput
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Password"
            secureTextEntry={pass ? false : true}
            style={styles.inputBar}
          />
          <TouchableOpacity
            onPress={togglePass}
            style={{
              width: 34,
              height: 34,
              borderRadius: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="eye-outline"
              style={{ opacity: password.length < 1 ? 0 : 0.4 }}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            justifyContent: "space-between",
          }}
        >
          <Text
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            style={{
              fontFamily: "MontserratMedium",
              color: "teal",
              fontSize: 13,
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratMedium",
                color: "black",
              }}
            >
              Don't have an account?{" "}
            </Text>
            Sign Up
          </Text>
          <TouchableOpacity onPress={() => bottomRef.current.open()}>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                color: "#999",
                fontSize: 13,
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableHighlight
          style={styles.continue}
          onPress={handleLoginFunc}
          // onPress={() => navigation.replace("Tabs", {})}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "MontserratMedium",
            }}
          >
            Login
          </Text>
        </TouchableHighlight>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  skipBtn: {
    paddingVertical: 3,
    marginTop: 4,
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
    fontFamily: "MontserratRegular",
  },
  inputBar: {
    flex: 1,
    height: 40,
    paddingLeft: 12,
  },
  continue: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "teal",
    borderRadius: 6,
    width: "100%",
    alignSelf: "center",
    marginTop: 14,
  },
});