import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { remFromFav } from "../../redux/action/actions";
import { style } from "../../Theme";
import DoctorCard from "../userprofile/custom/DoctorCard";
const { width, height } = Dimensions.get("screen");

export default function FavoriteDoc() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentDate = new Date().getFullYear();
  const removeItem = (index) => {
    dispatch(remFromFav(index));
  };
  const items = useSelector((state) => state);
  return (
    <View>
      <View style={[style.header, { backgroundColor: "#f9f9f9" }]}>
        <TouchableOpacity
          style={style.headerBackBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} />
        </TouchableOpacity>
        <Text style={style.header_text}>Favorite Doctor</Text>
      </View>
      {items.length <= 0 ? (
        <View
          style={{
            width,
            height: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/beam.gif")}
            style={{
              width,
              height: 300,
              resizeMode: "contain",
            }}
          />
          <Text style={{ fontFamily: "MontserratMedium", fontSize: 20 }}>
            No doctors added yet !
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
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
                onIconPress={() => {
                  removeItem(index);
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
}
