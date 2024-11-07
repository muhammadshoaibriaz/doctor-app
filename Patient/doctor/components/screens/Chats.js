import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import axios from "axios";
import { IP_ADDRESS } from "../../../db/IP";
import { useNavigation } from "@react-navigation/native";

const dateTime = new Date();
const time = dateTime.toTimeString();

const ChatList = ({ item, index, name, onPress, image }) => {
  return (
    <TouchableOpacity style={styles.touchableBtn} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>How can i help you?</Text>
      </View>
      <Text
        style={{
          fontFamily: "MontserratMedium",
          fontSize: 10,
          position: "absolute",
          right: 6,
          bottom: 14,
        }}
      >
        {dateTime.getHours() < 12
          ? time.slice(0, 5) + " AM"
          : time.slice(0, 5) + " PM"}
      </Text>
    </TouchableOpacity>
  );
};

export default function Chats({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  // console.log("params", params);
  const doctorId = params?.docUser?._id;

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    fetchDoctor();
    fetchPatients();
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      await fetch(`${IP_ADDRESS}/api/messages/${doctorId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("patients messages are ", data);
          setChat(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/api/users_profile`);
      const data = response.data;
      setPatients(data);
      // console.log("data is", data);
    } catch (error) {
      console.log("Error getting patients ", error.message);
    }
  };

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/api/doc/get_doctors`);
      setDoctors(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log("Error getting doctors ", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent={false} backgroundColor={"#fff"} />
      <View style={styles.header}>
        <Text style={[styles.headerTitle]}>Chats</Text>
      </View>
      {/* <FlatList
        data={[...Array(10)]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
          height: 130,
        }}
        renderItem={(item, index) => (
          <TouchableOpacity key={`index-${index}`} style={styles.storyView}>
            <Image
              source={require("../../assets/images/tolgamendi.jpg")}
              style={styles.image}
            />
            <Text style={styles.story_text}>Shabiii</Text>
          </TouchableOpacity>
        )}
      /> */}
      <FlatList
        data={patients}
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
        renderItem={({ item, i }) => (
          <ChatList
            name={item?.username}
            image={{ uri: item?.avatar }}
            onPress={() => navigation.navigate("Messages", { item })}
            key={item?._id ? item?._id.toString() : i.toString()}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontFamily: "MontserratBold",
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  touchableBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#fff",
    height: 70,
    paddingHorizontal: 14,
    position: "relative",
  },
  name: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
  },
  text: {
    fontFamily: "MontserratRegular",
    // fontSize: 16,
  },
  storyView: {
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 5,
    maxHeight: 80,
  },
  story_text: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
    marginTop: 4,
  },
});
