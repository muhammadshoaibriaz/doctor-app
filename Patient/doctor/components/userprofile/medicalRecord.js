import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width;

export default function MedicalRecord() {
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Add the base64 string to the images array
        setImages([...images, result.assets[0].uri]);
      }
    } catch (err) {
      console.log("Error picking image:", err);
    }
  };

  const storeImages = async () => {
    try {
      await AsyncStorage.setItem("images", JSON.stringify(images));
      console.log("Images stored successfully");
    } catch (err) {
      console.log("Error storing images:", err);
    }
  };

  useEffect(() => {
    retrieveStoredImages();
  }, []);
  const retrieveStoredImages = async () => {
    try {
      const storedImages = await AsyncStorage.getItem("images");
      if (storedImages !== null) {
        setImages(JSON.parse(storedImages)); // parsing stored images back to an array
      }
    } catch (err) {
      console.log("Error retrieving stored images:", err);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ width }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={18} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 18,
            marginRight: 20,
          }}
        >
          Patient Medical Record
        </Text>
        <Text style={{}}></Text>
      </View>
      {images.length > 0 ? (
        <View style={{ paddingHorizontal: 14 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "MontserratMedium",
                marginBottom: 3,
              }}
            >
              Your medical record
            </Text>
            <TouchableOpacity style={styles.fabBtn} onPress={pickImage}>
              <Text
                style={{
                  bottom: 1,
                  fontFamily: "MontserratMedium",
                  marginRight: 4,
                  color: "teal",
                }}
              >
                Add
              </Text>
              <AntDesign name="plus" size={20} color={"teal"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {images.map((image, index) => (
              <TouchableOpacity key={index} onLongPress={() => {}}>
                <Image
                  key={index}
                  source={{ uri: `${image}` }}
                  style={{
                    width: Dimensions.get("screen").width / 2.2,
                    height: Dimensions.get("screen").width / 2.2,
                    marginBottom: 5,
                    resizeMode: "cover",
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Button
            title="Clear Data"
            onPress={async () => {
              try {
                await AsyncStorage.removeItem("images");
                setImages([]);
                console.log(images.length);
              } catch (error) {
                console.log("Error removing images", error);
              }
            }}
          ></Button>
          <TouchableOpacity style={styles.saveBtn} onPress={storeImages}>
            <Text style={{ fontFamily: "MontserratBold", color: "#fff" }}>
              Save Data
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.container}>
            <FontAwesome size={60} name="folder-open" color={"teal"} />
            <Text
              style={{
                fontFamily: "MontserratMedium",
                textAlign: "center",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Keep your medical records organized and easily accessible.
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              Smart managing your medical health records!
            </Text>
            <Text style={{ fontFamily: "MontserratMedium", marginTop: 10 }}>
              ✔ Upload and save records
            </Text>
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={pickImage}
              activeOpacity={0.7}
            >
              <AntDesign name="plus" size={16} color={"#fff"} />
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#fff",
                  marginLeft: 5,
                }}
              >
                Add Reports
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "MontserratRegular",
              textAlign: "center",
              marginTop: 20,
            }}
            onPress={() => alert(images.length)}
          >
            All your added records to HotDoc will be listed here
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  box: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  container: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    marginTop: 70,
  },
  sendBtn: {
    width: 150,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "teal",
    flexDirection: "row",
    marginTop: 20,
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fabBtn: {
    width: 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "teal",
    elevation: 10,
    marginTop: 10,
  },
});
