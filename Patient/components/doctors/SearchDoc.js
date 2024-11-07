import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { FlatList, TextInput } from "react-native";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IP_ADDRESS } from "../../db/IP";
import axios from "axios";

export default function SearchDoc() {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDoctor, setFilteredDoctor] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      let response = await axios.get(`${IP_ADDRESS}/api/doc/get_doctors`);
      // console.log(response.data);
      setDoctors(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={false} backgroundColor="#f6f6f6" />
      <Animated.View style={[styles.header]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-down" size={22} />
        </TouchableOpacity>
        <Text
          style={{
            opacity: 0.6,
            fontSize: 18,
            fontFamily: "MontserratMedium",
            marginRight: 10,
          }}
        >
          Search Doctors
        </Text>
        <Text style={{}}> </Text>
      </Animated.View>
      <View style={styles.inputBar}>
        <TextInput
          defaultValue={search}
          textContentType="name"
          placeholder="Search..."
          dataDetectorTypes={"all"}
          autoFocus={false}
          inputMode="search"
          style={styles.input}
          onChangeText={(text) => {
            setSearch(text);
            if (text === "") {
              return doctors;
            }
            const filteredDoctors = doctors.filter((item) =>
              item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredDoctor(filteredDoctors);
          }}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="search1" size={16} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={
          filteredDoctor.length > 0 && search.length > 0
            ? filteredDoctor
            : doctors
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14, minHeight: "100%" }}
        renderItem={({ item, index }) => {
          return (
            <Animatable.View
              animation={"fadeInUp"}
              direction="alternate"
              delay={index * 200}
            >
              <TouchableOpacity
                style={styles.doctorCard}
                onPress={() => navigation.navigate("DocDetails", { item })}
              >
                <Image
                  source={
                    { uri: item?.image } ||
                    require("../../assets/images/tolgamendi.jpg")
                  }
                  style={[styles.image, { flex: 0.2 }]}
                />
                <View style={{ marginLeft: 10, flex: 0.8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.name}>{item?.name}</Text>
                    {item?.status === "accepted" && (
                      <Image
                        source={require("../../assets/images/verified.png")}
                        style={{
                          width: 14,
                          resizeMode: "contain",
                          height: 14,
                          marginLeft: 2,
                          tintColor: "teal",
                        }}
                      />
                    )}
                  </View>
                  <Text style={styles.details} numberOfLines={2}>
                    {item.specialist} - Surat Medical College Hospital
                  </Text>
                  <View
                    style={{
                      marginTop: 4,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign name="star" color={"orange"} size={10} />
                    <Text
                      style={{
                        fontSize: 10,
                        marginLeft: 4,
                        opacity: 0.4,
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      {item?.rating}/5
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        marginLeft: 4,
                        opacity: 0.4,
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      ({item?.reviews?.length} reviews)
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "space-between",
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 8,
    height: 90,
  },
  btnBox: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontFamily: "MontserratMedium",
  },
  details: {
    fontSize: 13,
    fontFamily: "MontserratRegular",
    opacity: 0.7,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  inputBar: {
    marginHorizontal: 14,
    borderRadius: 50,
    height: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "MontserratRegular",
    paddingLeft: 6,
  },
});
