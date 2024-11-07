import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { IP_ADDRESS } from "../../db/IP";
import { style } from "../../Theme";
import { uploadImageToCloudinary } from "../../db/cloudinary";

export default function EditProfile({ route }) {
  const { params } = route;
  // console.log(params);
  const userId = params?.user?._id;
  // console.log(userId);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const updateUser = async () => {
    if (!name || !email || !phone) {
      ToastAndroid.show("Please fill out all fields to update profile!", 3000);
    } else {
      try {
        let avatarUrl;
        if (avatar) {
          avatarUrl = await uploadImageToCloudinary(avatar);
          console.log("Avatar URL:", avatarUrl);
        }
        const response = await fetch(`${IP_ADDRESS}/api/user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email,
            phone,
            avatar: avatarUrl,
          }),
        });

        const updatedUserData = await response.json();
        setName("");
        setPhone("");
        setEmail("");
        ToastAndroid.show("Profile updated successfully!", 3000);
        console.log("updatedUserData", updatedUserData);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#eee" />
      <View style={style.header}>
        <TouchableOpacity
          style={style.headerBackBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} />
        </TouchableOpacity>
        <Text style={style.header_text}>Edit Profile</Text>
      </View>
      <View style={styles.header}>
        <View>
          <Image
            source={{ uri: !avatar ? params?.user?.avatar : avatar }}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            style={styles.edit}
          >
            <AntDesign name="picture" size={16} />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 14 }}>
          <Text style={styles.name}>{params?.user?.username}</Text>
          <Text style={styles.mail}>{params?.user?.email}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 14, paddingVertical: 20 }}>
        <Text style={styles.title}>Edit name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Shabii"
          style={styles.input}
        />
        <Text style={styles.title}>Edit email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="shabii@gmail.com"
          style={styles.input}
        />
        <Text style={styles.title}>Edit phone</Text>
        <TextInput
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder="+92 345 3454675"
          style={styles.input}
        />
        <TouchableHighlight
          underlayColor={"#ddd"}
          style={styles.button}
          onPress={updateUser}
        >
          <Text
            style={{
              fontFamily: "MontserratBold",
              color: "#fff",
            }}
          >
            Save
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 14,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  edit: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    position: "absolute",
    bottom: -5,
    right: 0,
  },
  name: {
    fontFamily: "MontserratMedium",
    fontSize: 18,
  },
  mail: {
    fontFamily: "MontserratRegular",
    opacity: 0.6,
  },
  title: {
    fontFamily: "MontserratMedium",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    fontFamily: "MontserratMedium",
  },
  button: {
    width: "100%",
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginTop: 20,
  },
});
