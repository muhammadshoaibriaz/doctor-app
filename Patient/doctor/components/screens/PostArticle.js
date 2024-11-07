import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
} from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Dialog } from "react-native-elements";
import { Snackbar } from "react-native-paper";
import { FlatList } from "react-native";
import axios from "axios";
import { IP_ADDRESS } from "../../../db/IP";
import { uploadImageToCloudinary } from "../../../db/cloudinary";
export default function PostArticle({ route }) {
  const { params } = route;
  // console.log("post article params", params);
  const user = params.docUser;

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  const dateTime = new Date();
  const reading_duration = Math.floor(Math.random() * 8) + 2;
  // console.log(reading_duration);

  // handle image picker
  const handleImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!results.canceled) {
      setBannerImage(results.assets[0].uri);
    }
  };

  // handle posting article
  const handleSubmitPost = async () => {
    try {
      if (!title || !description || !bannerImage) {
        ToastAndroid.show("Please fill out all fields!", 3000);
      } else {
        let avatarUrl = null;
        if (bannerImage) {
          avatarUrl = await uploadImageToCloudinary(bannerImage);
          console.log("Post blogs URL:", avatarUrl);
        }
        await axios.post(`${IP_ADDRESS}/api/doc/article`, {
          title,
          description,
          bannerImage: avatarUrl,
          views: 0,
          likes: 0,
          reading_duration,
          writer: user?.name,
          user_img: user?.image,
          posting_date: dateTime.toDateString(),
        });
        setDescription("");
        setBannerImage("");
        setTitle("");
        setVisible(!visible);
      }
    } catch (error) {
      console.log("Error posting article!", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 14, flex: 1 }}>
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
            Post Article
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "MontserratMedium" }}></Text>
      </View>

      <View style={styles.dialogBox}>
        <TouchableOpacity style={[styles.imageBtn]} onPress={handleImage}>
          {!bannerImage ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AntDesign name="picture" size={40} color={"#ddd"} />
              <Text style={styles.bannerText}>Upload banner</Text>
            </View>
          ) : (
            <Image source={{ uri: bannerImage }} style={styles.image} />
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
        <Text
          style={{
            fontStyle: "italic",
            marginTop: 15,
            color: "#ddd",
            alignSelf: "center",
          }}
        >
          Add delete article function if you want to delete!
        </Text>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          icon: "close",
          label: "Close",
          color: "#fff",
          onPress: () => setVisible(false),
        }}
        wrapperStyle={{
          width: "105%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 15,
            color: "#fff",
          }}
        >
          Article Posted Successfully!
        </Text>
      </Snackbar>
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
    borderStyle: "dashed",
    borderColor: "#ddd",
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
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
});
