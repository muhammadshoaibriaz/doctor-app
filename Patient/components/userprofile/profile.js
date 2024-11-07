import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-paper";
import Button from "./custom/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ route }) {
  const { params } = route;
  // console.log("profile params", params);
  const [on, setOn] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingHorizontal: 14 }}>
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
            My Profile
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "MontserratMedium" }}></Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          marginTop: 5,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: params?.user?.avatar }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              resizeMode: "contain",
              borderWidth: 3,
              borderColor: "#e3f6f6",
            }}
          />
          <View
            style={{
              marginLeft: 12,
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratMedium",
                opacity: 0.4,
              }}
            >
              Hello!
            </Text>
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 18,
              }}
            >
              {params?.user?.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <AntDesign name="edit" size={20} />
        </TouchableOpacity>
      </View>
      <TouchableHighlight
        style={{ marginTop: 10 }}
        underlayColor="#f9f9f9"
        onPress={() => {}}
      >
        <View style={styles.rows}>
          <View style={[styles.switch]}>
            <Ionicons name={"notifications-outline"} size={26} />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: "MontserratMedium",
                fontSize: 15,
              }}
            >
              Notifications
            </Text>
          </View>
          <View style={styles.switch}>
            <Text>{on ? "On" : "Off"}</Text>
            <Switch
              value={on}
              onChange={() => setOn(!on)}
              thumbColor="teal"
              trackColor={"teal"}
            />
          </View>
        </View>
      </TouchableHighlight>
      <Button
        icon={"heart-outline"}
        title={"Favorite Doctors"}
        onPress={() => {
          navigation.navigate("FavoriteDoc");
        }}
      />
      <Button
        icon={"receipt-outline"}
        title={"Medical Records"}
        onPress={() => {
          navigation.navigate("MedicalRecord");
        }}
      />
      <Button
        icon={"information-circle-outline"}
        title={"FAQ's"}
        onPress={() => {
          navigation.navigate("Faq");
        }}
      />
      <Button
        icon={"help-outline"}
        title={"Help"}
        onPress={() => {
          navigation.navigate("Help");
        }}
      />
      <TouchableHighlight
        style={styles.continue}
        onPress={() => navigation.replace("Login")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "MontserratMedium",
              marginLeft: 8,
              bottom: 1,
            }}
          >
            Log Out
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    // backgroundColor: "gold",
  },
  rows: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
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
});
