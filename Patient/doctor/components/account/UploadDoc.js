import { AntDesign, Feather } from "@expo/vector-icons";
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
import { uploadImageToCloudinary } from "../../../db/cloudinary";
export default function UploadDoc({ route }) {
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
  } = route.params;

  // console.log(
  //   "profile data",
  //   phone_number,
  //   bio,
  //   name,
  //   email,
  //   gender,
  //   dateOfBirth,
  //   workingSince,
  //   image,
  //   specialist
  // );

  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urlImage, setUrlImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [documents, setDocuments] = useState([]);

  const handleImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
      quality: 1,
    });
    if (!results.canceled) {
      setUrlImage(results.assets[0].uri);
    }
  };

  const handleSubmitDocuments = async () => {
    if (!title.trim() || !description.trim() || !image) {
      ToastAndroid.show("Please  fill all fields.", ToastAndroid.SHORT);
    } else {
      let avatarUrl = null;
      if (urlImage) {
        avatarUrl = await uploadImageToCloudinary(urlImage);
        console.log("avatarUrl", avatarUrl);
      }
      const newDocumentData = { title, description, urlImage: avatarUrl };
      setDocuments([...documents, newDocumentData]);
      setVisible(false);
      console.log(documents);
      setDescription("");
      setTitle("");
      setUrlImage(null);
    }
  };

  const handleUploads = () => {
    if (documents.length < 1) {
      ToastAndroid.show("Please upload documents for verification!", 2000);
    } else {
      navigation.navigate("Service", {
        documents,
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
      });
    }
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
            Upload documents
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "MontserratMedium" }}></Text>
      </View>
      <View style={styles.document}>
        <Text style={styles.text}>Id Proof</Text>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={styles.btn}
        >
          <Text style={styles.text}>Add+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.uploadedDoc}>
        {documents.map((item, index) => (
          <View style={styles.docCard} key={index}>
            <Image source={{ uri: item.urlImage }} style={styles.docImage} />
            <View
              style={{
                marginLeft: 12,
                width: Dimensions.get("screen").width / 1.8,
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text
                style={[styles.text, { fontFamily: "MontserratRegular" }]}
                numberOfLines={5}
              >
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Dialog
        isVisible={visible}
        animationType="fade"
        transparent
        statusBarTranslucent
        onBackdropPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}
        overlayStyle={{ width: 320, borderRadius: 14 }}
      >
        <View style={styles.dialogBox}>
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 20,
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            Upload documents
          </Text>
          <TouchableOpacity onPress={handleImage} style={styles.imagePick}>
            {!urlImage ? (
              <AntDesign
                name="picture"
                size={50}
                color={urlImage ? "#fff" : "#eee"}
              />
            ) : (
              <Image source={{ uri: urlImage }} style={styles.image} />
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
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleSubmitDocuments}
          >
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Dialog>

      <TouchableHighlight style={styles.continue} onPress={handleUploads}>
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
  document: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  btn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
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
    fontFamily: "MontserratMedium",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addBtn: {
    borderRadius: 50,
    width: "100%",
    height: 40,
    marginTop: 20,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadedDoc: {
    marginTop: 10,
  },
  addBtnText: {
    fontFamily: "MontserratBold",
    color: "#fff",
  },
  docCard: {
    width: Dimensions.get("screen"),
    padding: 6,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  docImage: {
    width: Dimensions.get("screen").width / 3.2,
    borderRadius: 10,
    height: Dimensions.get("screen").width / 3.2,
  },
  title: {
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
  imagePick: {
    position: "relative",
    width: 110,
    height: 110,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
});
