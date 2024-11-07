import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
} from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import DateTimePicker from "@react-native-community/datetimepicker";
import { uploadImageToCloudinary } from "../../../db/cloudinary";

export default function Profile({ route }) {
  // getting params from previous screen
  const { phone_number } = route.params;
  // console.log("phone_number", phone_number);

  const navigation = useNavigation();
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [workingSince, setWorkingSince] = useState("");
  const [image, setImage] = useState(null);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    // Format the date as per your requirement
    const formattedDate = currentDate.toDateString(); // For example, you can format it as per your requirement
    setDateOfBirth(formattedDate);
  };

  const handleImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
      quality: 1,
    });
    if (!results.canceled) {
      setImage(results.assets[0].uri);
    }
  };

  const handleForm = async () => {
    try {
      if (!email.trim().includes("@")) {
        ToastAndroid.show("Invalid email!", ToastAndroid.LONG);
        return;
      }
      if (
        !image ||
        !email.trim() ||
        !dateOfBirth.trim() ||
        !workingSince.trim() ||
        !specialist.trim() ||
        !gender.trim() ||
        !bio.trim()
      ) {
        ToastAndroid.show("Please fill out all fields!", 3000);
      } else {
        let avatarUrl = null;
        if (image) {
          avatarUrl = await uploadImageToCloudinary(image);
          console.log("Avatar URL:", avatarUrl);
        }
        navigation.navigate("UploadDoc", {
          phone_number,
          bio,
          name,
          email,
          password,
          gender,
          dateOfBirth,
          workingSince,
          image: avatarUrl,
          specialist,
        });
      }
    } catch (error) {
      console.log("Error submitting form!", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 14 }}>
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
            Profile
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "MontserratMedium" }}></Text>
      </View>
      <View style={styles.profile_banner}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity
          onPress={handleImage}
          style={[
            styles.btn,
            {
              position: "absolute",
              bottom: 0,
              right: 8,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#eee",
            },
          ]}
        >
          <AntDesign name="picture" size={16} />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View
        style={[styles.input, { flexDirection: "row", alignItems: "center" }]}
      >
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => setShowPicker(true)}
        >
          <AntDesign name="calendar" size={18} />
        </TouchableOpacity>
        <TextInput
          placeholder="Date of birth"
          value={dateOfBirth}
          readOnly={true}
          onFocus={() => onChange()}
          style={{
            height: "100%",
            flex: 1,
          }}
          onChangeText={(text) => setDateOfBirth(text)}
        />
      </View>
      <TextInput
        placeholder="Working since"
        style={styles.input}
        value={workingSince}
        onChangeText={(text) => setWorkingSince(text)}
      />
      <TextInput
        placeholder="Specialist"
        style={[styles.input]}
        value={specialist}
        onChangeText={(text) => setSpecialist(text.trim())}
      />
      {/* <Picker
        onValueChange={(value) => {
          setGender(value);
          console.log("value", value);
        }}
        selectedValue={gender}
        dropdownIconRippleColor={"teal"}
        placeholder="Select gender"
        mode="dropdown"
      >
        <Picker.Item label="Male" value={"Male"} />
        <Picker.Item label="Female" value={"Female"} />
      </Picker> */}
      <TextInput
        placeholder="Gender"
        style={[styles.input]}
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <TextInput
        placeholder="Bio"
        style={[
          styles.input,
          {
            height: 100,
            textAlignVertical: "top",
            paddingVertical: 10,
          },
        ]}
        multiline={true}
        value={bio}
        onChangeText={(text) => setBio(text)}
      />

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableHighlight style={styles.continue} onPress={handleForm}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontFamily: "MontserratMedium",
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
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
  profile_banner: {
    position: "relative",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "MontserratMedium",
    marginLeft: 8,
    bottom: 1,
  },
});
