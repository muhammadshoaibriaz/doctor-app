import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Image,
} from "react-native";
import { FontAwesome, Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { IP_ADDRESS } from "../../../db/IP";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Dialog } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../../../db/cloudinary";

export default function Chat({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  const { params } = route;
  // console.log("params ", params);
  const doctorId = params?.docUser?._id;
  const senderId = item?._id;

  const dr_name = params?.docUser?.name;
  // console.log("doctor id is", senderId);

  const currentTime = new Date().toTimeString().slice(0, 5);
  // console.log("currentTime", currentTime);

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    const response = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
      quality: 1,
    });

    if (response) {
      setImage(response.assets[0].uri);
    }
  };

  useEffect(() => {
    checkUnreadMessages();
  }, [messages]);
  useEffect(() => {
    scrollToBottom();
  }, []);

  const checkUnreadMessages = async () => {
    try {
      const response = await axios.get(
        `${IP_ADDRESS}/api/messages/${senderId}/${doctorId}`
      );
      setMessages(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error getting unread messages", error.message);
    }
  };

  const sendMessage = async () => {
    try {
      await fetch(`${IP_ADDRESS}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: senderId,
          doctorId: doctorId,
          sender: doctorId,
          content,
          time: currentTime,
        }),
      });
      setContent("");
      checkUnreadMessages();
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message", error.message);
    }
  };

  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const sendReport = async () => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
        console.log("Image url is ", imageUrl);
      }
      await axios.post(`${IP_ADDRESS}/api/reports`, {
        dr_name: dr_name,
        report: imageUrl,
        doctorId,
        patientId: senderId,
      });
    } catch (error) {
      console.log("Error posting report ", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={[styles.header]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setVisible(true);
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="angle-left" size={24} />
              <Image
                source={{
                  uri: item?.avatar,
                }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  marginLeft: 5,
                  backgroundColor: "#eee",
                }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  opacity: 0.6,
                  fontFamily: "MontserratMedium",
                  fontSize: 14,
                }}
              >
                {item?.username}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => navigation.navigate("AudioCall", { data, user })}
          >
            <Feather name="phone" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => navigation.navigate("VideoCall")}
          >
            <Ionicons name="videocam-outline" size={22} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <FlatList
        data={messages}
        ref={flatListRef}
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingBottom: 70,
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor:
                    item?.userId === item?.sender ? "#eee" : "teal",
                  alignSelf:
                    item?.userId === item?.sender ? "flex-start" : "flex-end",
                  borderRadius: item?.content?.length > 30 ? 20 : 46,
                  borderBottomRightRadius:
                    item?.userId === item?.sender ? null : 1,
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: item?.userId === item?.sender ? "#333" : "#fff",
                }}
              >
                {item?.content}
              </Text>
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 10,
                  alignSelf: "flex-end",
                  color: item?.userId === item?.sender ? "#333" : "#fff",
                }}
              >
                {item?.time}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.inputBar}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholder="Write message..."
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => {
            sendMessage();
            scrollToBottom();
          }}
        >
          <LinearGradient
            style={styles.touchBtn}
            start={{ x: 0.5, y: 0.4 }}
            colors={["#02bcbc", "teal"]}
          >
            <FontAwesome
              style={{ position: "absolute", marginLeft: 8 }}
              name="send-o"
              size={16}
              color={"#fff"}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Dialog
        visible={visible}
        animationType="fade"
        statusBarTranslucent={true}
        overlayStyle={{
          padding: 0,
          width: 320,
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Upload Prescription</Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                navigation.goBack();
              }}
            >
              <AntDesign name="close" color="#444" size={22} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={uploadImage} style={styles.modalBody}>
            {!image ? (
              <AntDesign name="picture" size={80} style={{ opacity: 0.1 }} />
            ) : (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => {
              sendReport();
              setVisible(false);
            }}
          >
            <Text style={styles.btnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  btnBox: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputBar: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  input: {
    flex: 1,
    height: "70%",
    backgroundColor: "#f4f4f4",
    borderRadius: 40,
    paddingLeft: 12,
    fontFamily: "MontserratRegular",
  },
  category: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  online: {
    color: "teal",
  },
  offline: {
    color: "red",
  },
  touchBtn: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  bubble: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 8,
    width: "auto",
    backgroundColor: "#eee",
    width: 280,
  },
  modal: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
    paddingHorizontal: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginBottom: 10,
  },
  modalTitle: {
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  submitBtn: {
    width: "85%",
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "teal",
    marginTop: 14,
  },
  btnText: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    color: "#fff",
  },
  modalBody: {
    width: "85%",
    height: 200,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
