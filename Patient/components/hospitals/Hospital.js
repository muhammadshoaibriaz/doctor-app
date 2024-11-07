import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import HospitalCard from "./HospitalCard";
import axios from "axios";
import { IP_ADDRESS } from "../../db/IP";
const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.75;
const SPACING = 14;

export default function Hospital() {
  const navigation = useNavigation();
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = async () => {
    const response = await axios.get(`${IP_ADDRESS}/api/hospitals`);
    // console.log(response.data);
    setHospitals(response.data);
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
            onPress={getHospitals}
            style={[styles.name, { marginRight: 35 }]}
          >
            Hospitals
          </Text>
        </View>
        <Text style={styles.name}></Text>
      </View>
      {/* <View style={styles.card}>
        <View>
          <Text style={styles.title}>Choose your city </Text>
          combo box this action can be performed by making dialog box and custom
          select value using state
        </View>
        <View>
          <Text style={styles.title}>Choose your Area </Text>
          combo box for state province (suba) this action can be performed by
          making dialog box and custom select value using state
        </View>
      </View> */}
      {/* search hospitals here */}
      <View style={styles.inputBar}>
        <TextInput
          value={value}
          onChangeText={(text) => {
            setValue(text);
            const filteredHospital = hospitals.filter((hospital) =>
              hospital.name.toLowerCase().includes(text.toLowerCase())
            );
            console.log(filteredHospital);
            setFilteredHospitals(filteredHospital);
          }}
          placeholder="Search hospitals..."
          style={styles.input}
        />
        <AntDesign
          name="search1"
          color={value.length <= 0 ? "#ddd" : "black"}
          size={18}
          disabled={value.length <= 0 ? true : false}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 14,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontFamily: "MontserratMedium", fontSize: 16 }}>
          Top Hospitals
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert("Not yet added");
          }}
        >
          <Text style={{ fontFamily: "MontserratRegular", fontSize: 12 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredHospitals.length > 0 ? filteredHospitals : hospitals} // if filteredHospitals is empty then show hospitals
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 14 }}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH + SPACING}
        renderItem={({ item, index }) => {
          return (
            <HospitalCard
              hosName={item?.name}
              location={item?.address}
              doctors={item?.doctors.length}
              rating={item?.rating}
              image={{ uri: item?.image }}
              onPress={() => navigation.navigate("HosDetails", { item })}
            />
          );
        }}
      />
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
    flex: 1,
    height: "100%",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    color: "#999",
  },
  title: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
  },
});
