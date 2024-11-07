import { Feather, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, {
  Component,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Animated,
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IP_ADDRESS } from "../../db/IP";
import { LinearGradient } from "expo-linear-gradient";
import { Dialog } from "react-native-elements";
import { AirbnbRating, Rating } from "react-native-ratings";

export default function Chat({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  const { data, user } = route.params;
  const recipientId = params?.data?._id;
  const senderId = params?.user?._id;
  // console.log("doctorId", params?.data);
  const { email, username, avatar } = user;
  // console.log("senderId", avatar);

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const currentTime = new Date().toTimeString().slice(0, 5);
  useEffect(() => {
    fetchMessages();
  }, [messages]);

  useEffect(() => {
    goToBottom();
  }, []);

  const sendMessage = async () => {
    try {
      setContent("");
      await fetch(`${IP_ADDRESS}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: senderId,
          doctorId: recipientId,
          sender: senderId,
          content,
          time: currentTime,
        }),
      });
      goToBottom();
    } catch (error) {
      console.error("Error sending message", error.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${IP_ADDRESS}/api/messages/${senderId}/${recipientId}`
      );
      setMessages(response.data);
      // console.log("messages are", response.data);
    } catch (error) {
      console.error("error getting messages", error.message);
    }
  };

  const bottomRef = useRef();
  const goToBottom = () => {
    bottomRef.current.scrollToEnd({ animated: true });
  };

  const sendRating = async () => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/api/doc/reviews`, {
        rating,
        review,
        patientEmail: email,
        patientName: username,
        patientImg: avatar,
        doctorId: recipientId,
      });
      console.log(response.data);
      setReview("");
      setVisible(false);
      navigation.goBack();
    } catch (error) {
      console.log("Error posting rating ", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
                source={{ uri: data?.image }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 48,
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
                {data?.name}
              </Text>
              {/* <Text
                style={{
                  opacity: 0.6,
                  fontFamily: "MontserratRegular",
                  fontSize: 10,
                  color: "green",
                }}
              >
                Online
              </Text> */}
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
        ref={bottomRef}
        data={messages}
        contentContainerStyle={{
          paddingBottom: 70,
          paddingHorizontal: 14,
        }}
        renderItem={({ item, index }) => {
          // console.log(item);
          return (
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor:
                    item?.userId === item?.sender ? "teal" : "#eee",
                  width: 280,
                  alignSelf:
                    item?.userId === item?.sender ? "flex-end" : "flex-start",
                  borderRadius: item?.content?.length > 30 ? 20 : 50,
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 13,
                  color: item?.userId === item?.sender ? "#ffff" : "#333",
                }}
              >
                {item?.content}
              </Text>
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 10,
                  alignSelf: "flex-end",
                  position: "absolute",
                  bottom: 4,
                  right: 12,
                  color: item?.userId === item?.sender ? "#fff" : "#333",
                }}
              >
                {item?.time}
              </Text>
            </View>
          );
        }}
      />
      <View
        style={[styles.inputBar, { height: content.length > 30 ? "auto" : 60 }]}
      >
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholder="Write message..."
          style={[
            styles.inputs,
            {
              borderRadius: content.length > 30 ? 8 : 40,
            },
          ]}
          multiline
        />
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => {
            sendMessage();
            goToBottom();
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
            <Text style={styles.modalTitle}>Write Review</Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                navigation.goBack();
              }}
            >
              <AntDesign name="close" color="#444" size={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              placeholder="Write review here..."
              style={styles.input}
              multiline
              onChangeText={(text) => setReview(text)}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.modalFooter}>
            <AirbnbRating
              count={5}
              reviews={[
                "Terrible",
                "Bad",
                "Meh",
                "OK",
                "Good",
                "Hmm...",
                "Very Good",
                "Wow",
                "Amazing",
                "Unbelievable",
                "Jesus",
              ]}
              defaultRating={rating}
              size={26}
              reviewColor="#444"
              showRating={false}
              onFinishRating={(val) => setRating(val)}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={sendRating}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    </View>
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
  inputs: {
    flex: 1,
    height: "70%",
    backgroundColor: "#f4f4f4",
    borderRadius: 40,
    paddingHorizontal: 12,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
    width: "auto",
    minHeight: 40,
    borderBottomRightRadius: 2,
  },

  bottomBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "teal",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  btn: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },
  userName: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
    marginTop: 10,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
  modal: {
    width: "100%",
    height: 400,
    paddingHorizontal: 14,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  modalBody: {
    marginTop: 8,
  },
  input: {
    width: "100%",
    height: 200,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    fontFamily: "MontserratRegular",
  },
  modalFooter: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtn: {
    width: "90%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  btnText: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
    color: "#fff",
  },
});
