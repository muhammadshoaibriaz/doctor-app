import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  Modal,
  Image,
} from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from "expo-location";

import { IP_ADDRESS } from "../../../db/IP";

const MultiSelect = ({ options, selectedItems, onSelect }) => {
  const handleToggle = (item) => {
    const selectedIndex = selectedItems.indexOf(item);
    if (selectedIndex === -1) {
      onSelect([...selectedItems, item]);
    } else {
      onSelect(selectedItems.filter((_, index) => index !== selectedIndex));
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => handleToggle(item)}
          style={
            selectedItems.includes(item) ? styles.selectedItem : styles.item
          }
        >
          <Text
            style={[
              selectedItems.includes(item) ? styles.selectedText : "",
              { fontFamily: "MontserratBold", fontSize: 11 },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function Availability({ route }) {
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
    documents,
    videoCallFee,
    textFee,
    visitFee,
    phoneCallFee,
    video_consultation,
    phone_call,
    text_conversation,
    actual_visit,
    video_call,
    videoConversationFee,
  } = route.params;

  // console.log(
  //   "newFormData params",
  //   phone_number,
  //   bio,
  //   name,
  //   email,
  //   gender,
  //   dateOfBirth,
  //   workingSince,
  //   image,
  //   specialist,
  //   documents,
  //   videoCallFee,
  //   textFee,
  //   visitFee,
  //   phoneCallFee,
  //   videoCallFee,
  //   video_consultation,
  //   phone_call,
  //   text_conversation,
  //   actual_visit,
  //   video_call
  // );

  useEffect(() => {
    getLocation();
  }, []);

  const navigation = useNavigation();
  const dateTime = new Date();
  const saveToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      // console.log("tokenValue ", value);
    } catch (err) {
      console.log(err.message);
    }
  };

  const [visible, setVisible] = useState(false);
  const [timing, setTiming] = useState("");
  const [ending, setEnding] = useState("");
  const [services, setServices] = useState("");

  const [selectedDays, setSelectedDays] = useState([]);
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleSelectDays = (selectedItems) => {
    setSelectedDays(selectedItems);
  };
  const [city, setCity] = useState("");
  const getLocation = async () => {
    try {
      let loc = await Location.getForegroundPermissionsAsync();
      if (loc.status == "granted") {
        console.log("Granted");
      } else {
        loc.canAskAgain == true;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = location.coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (response.length > 0) {
        const address = response[0];
        console.log(address);
        setCity(address.subregion || address.country);
      }
    } catch (err) {
      // setError(e.message);
      console.log("Error getting user current location!", err.message);
    }
  };

  const rating = Math.floor(Math.random() * 4) + 2;
  const joining_date = dateTime.toDateString();
  const handleSubmitSignUp = async () => {
    const service = services.split(",").map((service) => service.trim());
    const arrayData = JSON.stringify(service);
    try {
      if (selectedDays.length < 1) {
        ToastAndroid.show(
          "Please select days for your availability!",
          ToastAndroid.LONG
        );
      }
      if (!timing || !ending) {
        ToastAndroid.show(
          "Please select your availability time!",
          ToastAndroid.LONG
        );
      } else {
        saveToken("username", "userToken");
        const response = await axios.post(`${IP_ADDRESS}/api/doc/sign_up`, {
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
          documents,
          videoCallFee,
          textFee,
          visitFee,
          phoneCallFee,
          videoConversationFee,
          video_consultation,
          phone_call,
          text_conversation,
          actual_visit,
          video_call,
          availability: selectedDays,
          rating,
          timing,
          ending,
          joining_date,
          videoConsultationFee: videoConversationFee,
          balance: 0,
          city,
          degree: documents[0].title,
          services: service,
        });
        if (response.status === 200) {
          setVisible(true);
        }
      }
    } catch (error) {
      console.log("Error submitting data", error);
    }
    setVisible(true);
  };

  return (
    <View style={{ paddingHorizontal: 14 }}>
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
            Availability
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "MontserratMedium" }}></Text>
      </View>
      <Text style={styles.title}>Weekdays</Text>
      <MultiSelect
        options={DAYS}
        selectedItems={selectedDays}
        onSelect={handleSelectDays}
      />
      <Text style={styles.selection}>
        Selected Days: {selectedDays.join(", ")}
      </Text>

      {/* Services */}
      <Text style={styles.title}>Services</Text>
      <TextInput
        placeholder="( , ) Separated like Colonoscopy, Diagnostic"
        value={services}
        style={styles.input}
        onChangeText={(text) => setServices(text)}
      />

      <Text style={styles.title}>Add availability</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={styles.pricing}>
          <Text style={styles.text}>From</Text>
          <TextInput
            value={timing}
            onChangeText={(text) => setTiming(text)}
            placeholder="i.e 09:AM"
            style={styles.input}
          />
        </View>
        <View style={styles.pricing}>
          <Text style={styles.text}>To</Text>
          <TextInput
            value={ending}
            onChangeText={(text) => setEnding(text)}
            placeholder="i.e 04:PM"
            style={styles.input}
          />
        </View>
      </View>
      <TouchableHighlight style={styles.continue} onPress={handleSubmitSignUp}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableHighlight>
      <Modal
        visible={visible}
        animationType="fade"
        onDismiss={() => setVisible(!visible)}
        transparent={true}
        statusBarTranslucent={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 320,
              height: 460,
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/verified.png")}
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
                tintColor: "teal",
              }}
            />
            <Text
              style={{
                fontSize: 20,
                width: 300,
                marginTop: 10,
                textAlign: "center",
                fontFamily: "MontserratRegular",
              }}
            >
              Congratulation {name} your account was created successfully!
            </Text>
            <TouchableOpacity
              style={[styles.book, { marginTop: 60 }]}
              onPress={() => {
                setVisible(false);
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#fff",
                }}
              >
                Go to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  title: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    marginTop: 10,
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
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "MontserratMedium",
    marginLeft: 8,
    bottom: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontFamily: "MontserratMedium",
    marginTop: 10,
  },
  pricing: {
    width: "45%",
  },
  dayBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#eee",
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 50,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
  },
  selection: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  selectedText: {
    color: "#fff",
  },
  book: {
    backgroundColor: "teal",
    width: "90%",
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
});
