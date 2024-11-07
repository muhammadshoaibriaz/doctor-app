import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, StyleSheet, TextInput, ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { IP_ADDRESS } from "../../../db/IP";
import { uploadImageToCloudinary } from "../../../db/cloudinary";

export default function PostBlogs({ route }) {
  const { params } = route;
  const user = params.docUser;
  // console.log("profile params", params);
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState(null);
  const dateTime = new Date();

  const handleImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!results.canceled) {
      setUrl(results.assets[0].uri);
    }
  };

  // dummy data
  const reading_duration = Math.floor(Math.random() * 8) + 2;

  const handleSubmitPost = async () => {
    try {
      if (!title || !description || !url) {
        ToastAndroid.show("Please fill out all fields!", 3000);
      } else {
        let avatarUrl = null;
        if (url) {
          avatarUrl = await uploadImageToCloudinary(url);
          console.log("Post blogs URL:", avatarUrl); // Log the avatar URL
        }
        await axios.post(`${IP_ADDRESS}/api/doc/blog`, {
          title,
          description,
          url: avatarUrl,
          reading_duration,
          writer: user?.name,
          user_img: user?.image,
          posting_date: dateTime.toDateString(),
        });
        setDescription("");
        setUrl("");
        setTitle("");
        ToastAndroid.show("Posted successfully!", ToastAndroid.LONG);
      }
    } catch (error) {
      console.log("Error posting blog!", error);
      alert("Error posting blog!", error);
    }
    // console.log("handle submit post");
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 14 }}>
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
            Write blog
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "MontserratMedium" }}></Text>
      </View>

      <View style={styles.dialogBox}>
        <TouchableOpacity style={[styles.imageBtn]} onPress={handleImage}>
          {!url ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AntDesign name="picture" size={40} color={"#ddd"} />
              <Text style={styles.bannerText}>Upload banner</Text>
            </View>
          ) : (
            <Image source={{ uri: url }} style={styles.image} />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          multiline
          onChangeText={(text) => setDescription(text)}
          style={[styles.input, { height: 140, textAlignVertical: "top" }]}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleSubmitPost}>
          <Text style={styles.addBtnText}>Publish</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontFamily: "MontserratMedium",
  },
  text: {
    fontFamily: "MontserratMedium",
  },
  imageBtn: {
    width: 260,
    height: 190,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 10,
    overflow: "hidden",
  },
  addBtn: {
    borderRadius: 6,
    width: "100%",
    height: 50,
    marginTop: 20,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    fontFamily: "MontserratBold",
    color: "#fff",
  },
  bannerText: {
    fontFamily: "MontserratMedium",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 5,
    color: "#ddd",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
