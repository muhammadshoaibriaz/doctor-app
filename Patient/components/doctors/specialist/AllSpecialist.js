import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DocCard from "../../userprofile/custom/DocCard";
import { IP_ADDRESS } from "../../../db/IP";

export default function AllSpecialist({ route }) {
  const { specialist } = route.params;
  const navigation = useNavigation();

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctorsByType(specialist);
  }, [specialist]);

  const fetchDoctorsByType = async (specialist) => {
    try {
      const response = await fetch(
        `${IP_ADDRESS}/api/doc/sign_up${specialist}`
      );
      const data = await response.json();
      setDoctors(data);
      // console.log(data);
    } catch (error) {
      console.error("Error finding doctors by type:", error);
    }
  };

  return (
    <SafeAreaView>
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
            marginRight: 20,
          }}
        >
          {specialist}
        </Text>
        <Text style={{}}></Text>
      </View>
      {doctors.length > 0 ? (
        <FlatList
          data={doctors}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            // console.log("doctor data is ", item);
            return (
              <DocCard
                doctor_name={item?.name}
                description={item?.bio}
                experience={item?.experience}
                image={item?.image}
                onPress={() => navigation.navigate("DocDetails", { item })}
                rating={item?.rating}
                specialist={item?.specialist}
                reviews={item?.reviews}
                status={item?.status}
              />
            );
          }}
        />
      ) : (
        <View
          style={{
            height: "95%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="search1"
            size={70}
            style={{ marginBottom: 30, opacity: 0.2 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "MontserratMedium",
              opacity: 0.3,
            }}
          >
            No doctor available
          </Text>
        </View>
      )}
    </SafeAreaView>
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
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 10,
    height: 150,
    flexDirection: "row",
    overflow: "hidden",
    marginHorizontal: 14,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
  },
  specialist: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
    opacity: 0.4,
  },
  patient: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
  },
  description: {
    fontSize: 12,
    width: 200,
    fontFamily: "MontserratMedium",
    marginTop: 5,
  },
  title: {
    fontSize: 12,
    fontFamily: "MontserratBold",
    marginTop: 5,
  },
  docDetails: {
    width: 190,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  likeHeart: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 15,
  },
});
