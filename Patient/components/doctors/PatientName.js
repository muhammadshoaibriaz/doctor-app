import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  ScrollView,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width / 3;
export default function PatientName({ route }) {
  const { newDay, newItem, fee, user } = route.params;
  let allNewData = { newDay, newItem };
  // console.log("new data is", newItem);
  // console.log("patient screen all new data", user);
  console.log(allNewData?.newDay);
  // console.log(allNewData?.newTiming);
  const AGES = [10, 20, 30, 40, 50, 60];
  const [active, setActive] = useState(2);
  const [patientName, setPatientName] = useState("");
  const [genderType, setGenderType] = useState("");
  const [problem, setProblem] = useState("");
  const [time, setTime] = useState("");
  const navigation = useNavigation();
  const patientDetails = () => {
    if (!patientName || !genderType || !problem) {
      ToastAndroid.show("Please enter your details to continue", 3000);
    } else {
      navigation.navigate("Payment", {
        docDetails: allNewData,
        age: AGES[active],
        pname: patientName,
        pGender: genderType,
        pProblem: problem,
        time: time,
        fee,
        user,
        genderType,
        problem,
      });
      setProblem("");
    }
  };
  return (
    <ScrollView
      style={{
        // flex: 1,
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 14,
        position: "relative",
      }}
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
            marginRight: 40,
          }}
        >
          Patient details
        </Text>
        <Text style={{}}></Text>
      </View>
      <Text style={{ fontFamily: "MontserratMedium", fontSize: 16 }}>
        Full Name
      </Text>
      <TextInput
        value={patientName}
        onChangeText={(text) => setPatientName(text)}
        placeholder="Shabiii"
        style={styles.input}
      />
      <Text style={{ fontFamily: "MontserratMedium", fontSize: 16 }}>
        Select your age
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {AGES.map((age, index) => (
          <TouchableOpacity onPress={() => setActive(index)} key={index}>
            <Text
              style={[
                styles.box,
                {
                  backgroundColor: index === active ? "teal" : "#fff",
                  color: index === active ? "#fff" : "#111",
                  fontFamily: "MontserratRegular",
                },
              ]}
            >
              {age}+
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ fontFamily: "MontserratMedium", fontSize: 16 }}>
        Gender
      </Text>
      <TextInput
        value={genderType}
        onChangeText={(text) => setGenderType(text)}
        placeholder="Male/Female/Other"
        style={styles.input}
      />
      <Text style={{ fontFamily: "MontserratMedium", fontSize: 16 }}>
        Select Appointment time
      </Text>
      <TextInput
        value={time}
        onChangeText={(text) => setTime(text)}
        placeholder="Select time according to doctors timing"
        style={styles.input}
      />
      <Text style={{ fontFamily: "MontserratMedium", fontSize: 16 }}>
        Write your problem
      </Text>
      <TextInput
        placeholder="Write..."
        value={problem}
        multiline={true}
        onChangeText={(text) => setProblem(text)}
        style={[
          styles.input,
          {
            height: 200,
            textAlignVertical: "top",
            padding: 12,
          },
        ]}
      />
      <TouchableOpacity style={styles.book} onPress={patientDetails}>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            color: "#fff",
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 130,
    flexDirection: "row",
    marginTop: 30,
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  book: {
    backgroundColor: "teal",
    width: "100%",
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingLeft: 12,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: "MontserratRegular",
  },
});
