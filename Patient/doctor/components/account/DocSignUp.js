import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
Dimensions.get("screen");
import { IP_ADDRESS } from "../../db/doctorDb";

export default function DocSignUp() {
  const navigation = useNavigation();
  //   State for the user's input
  const reviews = Math.floor(Math.random() * 250);
  const patients = Math.floor(Math.random() * 330);
  const experience = Math.floor(Math.random() * 10);
  const rating = Math.floor(Math.random() * 5);
  const [doctorData, setDoctorData] = useState({
    doctor_name: "",
    email: "",
    specialist: "",
    phone_number: "",
    address: "",
    shedule_available: ["Mon", "Tue", "Thu", "Fri", "Sat"],
    working_hours: [
      "09:00AM",
      "09:30AM",
      "10:00AM",
      "10:30AM",
      "11:00AM",
      "11:30AM",
      "12:00AM",
      "12:00PM",
      "02:00PM",
      "02:30PM",
      "03:00PM",
      "03:30PM",
      "04:00PM",
    ],
    description: "",
    biography: "",
    patients: patients,
    experience: experience,
    reviews: reviews,
    rating: rating,
    image: null,
    hospital: ["Hospital A", "Hospital B", "Hospital C"],
  });

  const handleChange = (field, value) => {
    setDoctorData({ ...doctorData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}/api/doctors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });
      const data = await response.json();
      // navigation.navigate("PickImage", { data });
      console.log("Doctor created successfully:", data);
      Alert.alert("Info", "Doctor created successfully!", [
        { text: "Ok", onPress: () => {} },
      ]);
    } catch (error) {
      console.error("Error creating doctor:", error.message);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setDoctorData({ ...doctorData, image: result.assets[0].uri });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu-sharp" size={22} />
        </TouchableOpacity>
        <View style={{}}>
          <Text
            style={[styles.name, { marginRight: 35 }]}
            onPress={() => navigation.navigate("PickImage")}
          >
            Are you a doctor?
          </Text>
        </View>
        <Text style={styles.name}></Text>
      </View>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={{ fontFamily: "MontserratRegular", marginBottom: 20 }}>
          Let us know if you want to display your information as doctor or want
          us to edit it. We will be happy to help.
        </Text>
        <View style={{ position: "relative", alignItems: "center" }}>
          <Image
            width={100}
            height={100}
            source={{
              uri:
                doctorData.image ||
                "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1712652695~exp=1712653295~hmac=f328588bab5735bfb44d363a685e94b164b17ca04582c814b0e4ef62a935c1e2",
            }}
            resizeMode="cover"
            style={{ borderRadius: 100, borderWidth: 2, borderColor: "#fff" }}
          />
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            style={styles.penBtn}
          >
            <FontAwesome name="image" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
        <TextInput
          // value={doctorName}
          placeholder="John Doe"
          style={styles.input}
          onChangeText={(text) => handleChange("doctor_name", text.trim())}
        />
        <TextInput
          // value={doctor_email}
          onChangeText={(text) => handleChange("email", text.trim())}
          placeholder="abc@gmail.com"
          style={styles.input}
        />
        <TextInput
          // value={phone_number}
          onChangeText={(text) => handleChange("phone_number", text.trim())}
          placeholder="+92 342-4534654"
          style={styles.input}
        />
        <TextInput
          // value={address}
          onChangeText={(text) => handleChange("address", text.trim())}
          placeholder="Khanewal"
          style={styles.input}
        />
        <TextInput
          // value={speciality}
          onChangeText={(text) => handleChange("specialist", text.trim())}
          placeholder="Speciality"
          style={styles.input}
        />
        <TextInput
          // value={available_days}
          onChangeText={(text) => handleChange("available_days", text.trim())}
          placeholder="Availibility"
          style={styles.input}
        />
        <TextInput
          // value={working_hours}
          // onChangeText={(text) => handleChange("working_hours", text)}
          placeholder="Working hours (optional)"
          style={styles.input}
        />
        <TextInput
          // value={description}
          onChangeText={(text) => handleChange("description", text.trim())}
          placeholder="Short intro"
          style={styles.input}
        />
        <TextInput
          // value={hospital}
          onChangeText={(text) => handleChange("hospital", text)}
          placeholder="Hospitals"
          style={styles.input}
        />
        <TextInput
          // value={biography}
          placeholder="Biography"
          style={[
            styles.input,
            {
              textAlignVertical: "top",
              height: 180,
              borderWidth: 1,
              borderColor: "#eee",
              padding: 8,
              borderRadius: 8,
            },
          ]}
          multiline
          onChangeText={(text) => handleChange("biography", text.trim())}
          autoComplete="nickname"
          autoCorrect={true}
        />
        <TouchableHighlight
          onPress={() => {
            handleSubmit();
            // bottomSheetRef.current.open();
          }}
          style={styles.button}
        >
          <Text style={[styles.name, { color: "#fff" }]}>Submit</Text>
        </TouchableHighlight>
      </View>
      {/* <RawBottomSheet
        height={240}
        ref={bottomSheetRef}
        animationType="slide"
        closeOnDragDown={true}
      ></RawBottomSheet> */}
    </ScrollView>
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
    height: 50,
    justifyContent: "space-between",
  },

  name: {
    fontFamily: "MontserratMedium",
    fontSize: 18,
  },
  edit: {
    width: 40,
    height: 40,
    justifyContent: "center",
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginTop: 14,
  },
  inputBar: {
    marginHorizontal: 14,
    borderRadius: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    fontFamily: "MontserratMedium",
    fontSize: 14,
    color: "#999",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  messageInput: {
    width: "100%",
    marginBottom: 10,
    fontFamily: "MontserratMedium",
    fontSize: 14,
    height: "auto",
    color: "#999",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  penBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
    left: 25,
    backgroundColor: "teal",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd",
  },
});
