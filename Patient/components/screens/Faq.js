import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Faq() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };
  const onPress1 = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen1(!open1);
  };
  const onPress2 = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen2(!open2);
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 14 }}>
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
            marginRight: 15,
          }}
        >
          FAQ's
        </Text>
        <Text style={{}}></Text>
      </View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            height: 50,
          }}
        >
          <Text
            style={{ fontFamily: "MontserratRegular", flex: 0.9, fontSize: 13 }}
          >
            Are there any type of doctors who are not included in DoctorPoint
            Pro consultation network
          </Text>
          <AntDesign
            name="right"
            style={{ justifyContent: "flex-end" }}
            size={14}
          />
        </View>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: "MontserratRegular", color: "teal" }}>
            No!, there are not other type of doctors who are not included in
            DoctorPoint Pro consultation network{" "}
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={onPress1} activeOpacity={0.6}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            height: 50,
          }}
        >
          <Text
            style={{ fontFamily: "MontserratRegular", flex: 0.9, fontSize: 13 }}
          >
            How many online consultation can i use?
          </Text>
          <AntDesign
            name="right"
            style={{
              justifyContent: "flex-end",
            }}
            size={14}
          />
        </View>
      </TouchableOpacity>
      {open1 && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: "MontserratRegular", color: "teal" }}>
            You can use multiple appointment you want
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={onPress2} activeOpacity={0.6}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            height: 50,
            marginTop: 10,
          }}
        >
          <Text
            style={{ fontFamily: "MontserratRegular", flex: 0.9, fontSize: 13 }}
          >
            Which family members will be able to use my account ?
          </Text>
          <AntDesign
            name="right"
            style={{ justifyContent: "flex-end" }}
            size={14}
          />
        </View>
      </TouchableOpacity>
      {open2 && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: "MontserratRegular", color: "teal" }}>
            Your all family members can use your account if you permit
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
