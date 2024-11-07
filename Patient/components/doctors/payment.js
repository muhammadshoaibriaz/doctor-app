import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import { IP_ADDRESS } from "../../db/IP";
import Carousel from "react-native-reanimated-carousel";
import axios from "axios";
export default function Payment({ route }) {
  const { docDetails, pname, user, time, fee, genderType, age, problem } =
    route.params;
  const doctor = docDetails?.newItem;
  // console.log("doc detail", docDetails);
  // console.log("user", age);
  const doctorId = doctor?._id;
  const userId = user?._id;

  const navigation = useNavigation();
  const handleChangeText = (text) => {
    // Remove any existing spaces
    const newValue = text.replace(/\s/g, "");
    // Add spaces after every 4 characters
    const spacedValue = newValue.replace(/(.{4})/g, "$1 ");
    // Update the state with the formatted value
    setCardNumber(spacedValue);
  };

  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [visible, setVisible] = useState(false);

  const data = [
    {
      id: "1",
      img: require("../../assets/images/card1.png"),
    },
    {
      id: "2",
      img: require("../../assets/images/PayPak.png"),
    },
    {
      id: "3",
      img: require("../../assets/images/Classic.png"),
    },
    {
      id: "4",
      img: require("../../assets/images/Gold.png"),
    },
  ];

  const dateTime = new Date();

  const booked_time = dateTime.toDateString();

  const UpdateBalance = async () => {
    try {
      const response = await fetch(
        `${IP_ADDRESS}/api/doc/sign_up/${docDetails?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ balance: fee }),
        }
      );
      await response.json();
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const confirmPayment = () => {
    if (!cardNumber) {
      ToastAndroid.show("Please enter card details ", 2000);
      return;
    }
    if (!holderName) {
      ToastAndroid.show("Please enter card holder name!", 3000);
      return;
    }
    if (cardNumber.length < 14) {
      ToastAndroid.show("Invalid card details", 2000);
      return;
    } else {
      handleSubmit();
      setCardNumber("");
      setHolderName("");
      UpdateBalance();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/api/appointments`, {
        doctor_name: doctor?.name,
        doc_image: doctor?.image,
        patient_name: user?.username,
        patient_image: user?.avatar,
        email: user?.email,
        phoneNumber: user?.phone_number,
        day: docDetails?.newDay,
        specialist: doctor?.specialist,
        hospital: "Surat Medical Hospital",
        time,
        booked_time,
        doctorId,
        userId: userId,
        genderType,
        age,
        problem,
        patientId: userId,
      });
      // console.log(response.data);
      if (response.data.exists) {
        Alert.alert("Already Booked!", "Doctor not available at that time!");
      } else {
        setVisible(!visible);
      }
    } catch (error) {
      console.log("Error while booking appointment: ", error.message);
      alert("Failed to book appointment!");
    }
  };

  return (
    <View style={{ backgroundColor: "#f9f9f9" }}>
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
          }}
        >
          Payment
        </Text>
        <Text style={{}}></Text>
      </View>
      <View
        style={{
          paddingHorizontal: 14,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "MontserratMedium", fontSize: 20 }}>
          Payment
        </Text>
        <TouchableOpacity>
          <Text style={{ fontFamily: "MontserratRegular" }}>
            + Add your card
          </Text>
        </TouchableOpacity>
      </View>
      <Carousel
        data={data}
        width={width}
        height={width / 2}
        autoPlay={true}
        windowSize={width}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        autoPlayInterval={2000}
        mode="parallax"
        loop
        renderItem={({ item }) => {
          return (
            <Image
              source={item?.img}
              resizeMode="contain"
              style={{
                width: width - 20,
                height: width / 2,
                borderRadius: 20,
                resizeMode: "cover",
                marginLeft: 10,
                marginRight: 10,
              }}
            ></Image>
          );
        }}
      ></Carousel>
      <View style={styles.card}>
        <Text style={{ fontFamily: "MontserratMedium" }}>Visa Card Number</Text>
        <TextInput
          placeholder="Xxxx Xxxx Xxxx 4774"
          style={styles.input}
          keyboardType="decimal-pad"
          autoComplete="cc-number"
          value={cardNumber}
          onChangeText={handleChangeText}
          maxLength={19}
        />

        <Text style={{ fontFamily: "MontserratMedium" }}>
          Visa Card Holder Name
        </Text>
        <TextInput
          placeholder="Muhammad"
          keyboardType="ascii-capable"
          style={styles.input}
          value={holderName}
          onChangeText={(name) => setHolderName(name)}
        />
      </View>
      <TouchableOpacity
        style={styles.book}
        onPress={() => {
          confirmPayment();
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratMedium",
            color: "#fff",
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
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
              source={require("../../assets/images/check.png")}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
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
              Congratulation {pname} your appointment with{" "}
              {docDetails?.newItem?.name} booked successfully!
            </Text>
            <TouchableOpacity
              style={[styles.book, { marginTop: 60 }]}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#fff",
                }}
              >
                Continue
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
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  book: {
    backgroundColor: "teal",
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 14,
    width: "92%",
    marginTop: 30,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "auto",
    marginHorizontal: 14,
    marginTop: 20,
  },
  input: {
    height: 40,
    fontFamily: "MontserratRegular",
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
