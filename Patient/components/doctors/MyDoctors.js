import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DoctorCard from "../userprofile/custom/DoctorCard";
import { useDispatch, useSelector } from "react-redux";
import { remFromFav } from "../../redux/action/actions";

export default function MyDoctors() {
  const navigation = useNavigation();
  const currentDate = new Date().getFullYear();
  const dispatch = useDispatch();
  const removeItem = (index) => {
    dispatch(remFromFav(index));
  };
  const items = useSelector((state) => state);
  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <StatusBar translucent={false} backgroundColor="#f6f6f6" />
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
          My Doctors
        </Text>
        <Text style={{}}></Text>
      </View>
      {items?.length < 1 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 24,
              opacity: 0.3,
            }}
          >
            No doctor added yet!{" "}
          </Text>
        </View>
      ) : (
        items.map((item, index) => {
          return (
            <DoctorCard
              bio={item?.bio}
              doctor_name={item?.name}
              experience={currentDate - item?.workingSince}
              image={{ uri: item?.image }}
              onPress={() => navigation.navigate("DocDetails", { item })}
              patients={item?.patients || "NaN"}
              rating={item?.rating}
              review={item?.reviews}
              specialist={item?.specialist}
              key={index}
              iconName={"close"}
              status={item?.status}
              onIconPress={() => {
                removeItem(index);
              }}
            />
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 10,
    height: 150,
    flexDirection: "row",
    overflow: "hidden",
    marginHorizontal: 14,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
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
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 15,
  },
});
