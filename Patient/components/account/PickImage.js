import React, { Component, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
  Linking,
} from "react-native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { IP_ADDRESS } from "../../db/IP";
import * as Location from "expo-location";
import * as Animatable from "react-native-animatable";
import { Button, Dialog } from "react-native-elements";
import { uploadImageToCloudinary } from "../../db/cloudinary";
export default function PickImage({ route }) {
  const navigation = useNavigation();
  const {
    username,
    email,
    password,
    phone_number,
    gender,
    blood,
    chosenDate,
    disease,
  } = route.params;
  const [city, setCity] = useState(null);
  const [visible, setVisible] = useState(false);
  const dateTime = new Date();
  // pick image

  const age =
    dateTime.toDateString().slice(10, 15) -
    chosenDate.toDateString().slice(10, 15);

  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
    });
    if (!results.canceled) {
      setAvatar(results.assets[0].uri);
      console.log(avatar);
    } else {
      ToastAndroid.show("Operation cancelled!", 3000);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  // console.log(chosenDate.toDateString());

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location is required!");
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = location.coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (response.length > 0) {
        const address = response[0];
        setCity(address.subregion || address.country);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const createUser = async () => {
    try {
      let avatarUrl = null;
      if (avatar) {
        avatarUrl = await uploadImageToCloudinary(avatar);
        console.log("Avatar URL:", avatarUrl); // Log the avatar URL
      }

      const response = await axios.post(`${IP_ADDRESS}/api/user`, {
        username,
        email,
        password,
        phone_number,
        gender,
        city,
        blood,
        avatar: avatarUrl,
        age,
        disease,
        chosenDate: chosenDate.toDateString(),
        joined: dateTime.toDateString(),
      });

      console.log("Response from server:", response.data); // Log server response
      if (response.data.exists) {
        alert("Email already in use!");
      } else {
        setVisible(!visible);
      }
    } catch (err) {
      if (err.response) {
        console.error("Server error response data:", err.response.data);
        console.error("Server error response status:", err.response.status);
        console.error("Server error response headers:", err.response.headers);
      } else if (err.request) {
        console.error("Server error request data:", err.request);
      } else {
        console.error("Server error message:", err.message);
      }
      throw err;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "MontserratMedium",
          fontSize: 24,
          marginBottom: 10,
        }}
      >
        Complete your profile 🗓
      </Text>
      <Text style={{ fontSize: 16, fontFamily: "MontserratRegular" }}>
        Don't worry only you can see your personal details. No one will be able
        to see you
      </Text>
      <TouchableOpacity
        style={[
          styles.imagePicker,
          {
            borderWidth: !avatar ? 1 : 3,
          },
        ]}
        onPress={pickImage}
      >
        {!avatar ? (
          <AntDesign name="picture" size={40} style={{ color: "#ddd" }} />
        ) : (
          <Image source={{ uri: avatar }} style={styles.image} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableBtn} onPress={createUser}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
      <Dialog
        visible={visible}
        statusBarTranslucent
        onDismiss={() => setVisible(!visible)}
        onBackdropPress={() => setVisible(false)}
        animationType="fade"
        backdropStyle={{ backgroundColor: "#00000090" }}
        overlayStyle={{
          padding: 0,
          width: 330,
          height: 400,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 14,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Animatable.Image
            animation={"zoomIn"}
            source={require("../../assets/images/check.png")}
            style={{ width: 130, height: 130, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "MontserratMedium",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Congratulations your account's created successfully!
          </Text>
          <TouchableOpacity
            style={[
              styles.touchableBtn,
              { position: "relative", bottom: 0, marginTop: 20 },
            ]}
            onPress={() => {
              setVisible(false);
              setTimeout(() => {
                navigation.navigate("Login");
              }, 500);
            }}
          >
            <Text style={styles.text}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  backBtn: {
    position: "relative",
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  touchableBtn: {
    bottom: 10,
    borderRadius: 6,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "teal",
    alignSelf: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "MontserratMedium",
  },

  imagePicker: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#eee",
    marginTop: 40,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    padding: 0,
    width: 330,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
