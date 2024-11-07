import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { IP_ADDRESS } from "../../db/IP";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function Signup() {
  const navigation = useNavigation();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [blood, setBlood] = useState("");
  const [gender, setGender] = useState("");
  const [disease, setDisease] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone] = useState("");

  const [chosenDate, setChosenDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || chosenDate;
    setChosenDate(currentDate);
    setShowPicker(false);
  };

  const generateOTP = (length) => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  // Usage
  const otpCode = generateOTP(4); // Generate a 4-digit OTP
  // console.log("Generated OTP:", otpCode);

  const submitData = async () => {
    if (!username.trim() || !password.trim() || !email.trim()) {
      ToastAndroid.show("Please fill all fields!", 2000);
    } else if (!phone_number.trim() || phone_number.length < 10) {
      ToastAndroid.show("Invalid phone number!", 3000);
    } else {
      navigation.navigate("MPin", {
        username,
        email,
        password,
        phone_number,
        otpCode,
        gender,
        blood,
        chosenDate,
        disease,
      });
    }
    // navigation.navigate("PickImage");
  };
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 14,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.image}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratRegular",
            marginBottom: 2,
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            fontFamily: "MontserratBold",
            fontSize: 24,
            marginBottom: 20,
          }}
        >
          HotDoc
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.label}>
            <Feather name="mail" size={18} color="teal" />
            <Text style={{ fontFamily: "MontserratMedium", marginLeft: 4 }}>
              Email
            </Text>
          </View>
          <TextInput
            value={email}
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
            placeholder="shabii@gmail.com"
            style={[styles.input]}
          />
        </View>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.label}>
            <Feather name="user" size={18} color="teal" />
            <Text style={{ fontFamily: "MontserratMedium", marginLeft: 4 }}>
              Name
            </Text>
          </View>
          <TextInput
            value={username}
            onChangeText={(value) => setName(value)}
            keyboardType="default"
            placeholder="Enter your full name"
            style={[styles.input]}
          />
        </View>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.label}>
            <Feather name="phone-call" size={18} color="teal" />
            <Text style={{ fontFamily: "MontserratMedium", marginLeft: 4 }}>
              Phone number
            </Text>
          </View>
          <TextInput
            value={phone_number}
            keyboardType="phone-pad"
            onChangeText={(value) => setPhone(value)}
            placeholder="+92 Enter your phone number"
            style={styles.input}
          />
        </View>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.label}>
            <Feather name="lock" size={18} color="teal" />
            <Text style={{ fontFamily: "MontserratMedium", marginLeft: 4 }}>
              Password
            </Text>
          </View>
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            placeholder="Enter password"
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowPicker(!showPicker)}
          activeOpacity={0.6}
        >
          <View style={{ marginBottom: 14 }}>
            <View style={styles.label}>
              <Feather name="calendar" size={18} color="teal" />
              <Text style={{ fontFamily: "MontserratMedium", marginLeft: 4 }}>
                Date of Birth
              </Text>
            </View>
            <Text
              style={{
                flex: 1,
                fontFamily: "MontserratRegular",
                lineHeight: 40,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
              }}
            >
              {chosenDate.toDateString()}
            </Text>
            {showPicker && (
              <DateTimePicker
                value={chosenDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.label}>
            <Feather name="user-x" size={18} color="teal" />
            <Text style={{ fontFamily: "MontserratMedium", marginLeft: 4 }}>
              Gender
            </Text>
          </View>
          <TextInput
            value={gender}
            onChangeText={(value) => setGender(value)}
            placeholder="Male/Female"
            style={styles.input}
          />
        </View>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.label}>
            <FontAwesome5 name="virus" size={18} color="teal" />
            <Text style={{ fontFamily: "MontserratMedium", marginLeft: 4 }}>
              Disease
            </Text>
          </View>
          <TextInput
            value={disease}
            onChangeText={(value) => setDisease(value)}
            placeholder="headache/fever/cough etc"
            style={styles.input}
          />
        </View>
        <View style={{ marginBottom: 14 }}>
          <View style={styles.label}>
            <Feather name="droplet" size={18} color="teal" />
            <Text style={{ fontFamily: "MontserratMedium", marginLeft: 4 }}>
              Blood Group
            </Text>
          </View>
          <TextInput
            value={blood}
            onChangeText={(value) => setBlood(value)}
            placeholder="A+/ A-"
            style={styles.input}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
            width: "100%",
            marginBottom: 5,
            fontFamily: "MontserratRegular",
          }}
        >
          Using this app implies your agreement to HotDoc's:
        </Text>
        <Text style={{ color: "teal", fontFamily: "MontserratRegular" }}>
          Terms of Service
        </Text>
        <Text
          style={{
            marginBottom: 10,
            marginTop: 10,
            fontFamily: "MontserratRegular",
          }}
        >
          Your information is kept confidential and never shared without consent
        </Text>
        <TouchableHighlight style={styles.continue} onPress={submitData}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "MontserratMedium",
            }}
          >
            Send Verification Code
          </Text>
        </TouchableHighlight>
        <TouchableOpacity
          style={{ alignSelf: "center", paddingBottom: 10 }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "MontserratMedium",
            }}
          >
            Already have an account?{" "}
            <Text style={{ color: "teal" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 40,
  },
  continue: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "teal",
    borderRadius: 6,
    marginTop: 20,
    bottom: 10,
  },
  input: {
    width: "100%",
    height: 34,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 14,
    fontFamily: "MontserratRegular",
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
  },
});
