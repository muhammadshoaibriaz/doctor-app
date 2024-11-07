import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Dialog } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { IP_ADDRESS } from "../../../db/IP";
import axios from "axios";

export default function PatientDetails({ route }) {
  const { item } = route.params;
  // console.log("item", item);
  const navigation = useNavigation();
  const [patientDetails, setPatientDetails] = useState(null);
  const [reports, setReports] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getPatientDetails();
    getReports();
  }, []);

  const getPatientDetails = async () => {
    try {
      const response = await axios.get(
        `${IP_ADDRESS}/api/user/${item?.patientId}`
      );
      // console.log("patient id", response.data);
      setPatientDetails(response.data);
    } catch (err) {
      console.log("Error getting patient details", err.message);
    }
  };

  const getReports = async () => {
    try {
      const response = await axios.get(
        `${IP_ADDRESS}/api/reports/user/${item?.patientId}`
      );
      console.log("patient reports", response.data);
      setReports(response.data);
    } catch (err) {
      console.log("Error getting patient reports", err.message);
    }
  };

  const [img, setImg] = useState(null);

  return (
    <SafeAreaView role="feed">
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 20,
            marginRight: 40,
          }}
        >
          Patient details
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{}}>
          <View style={styles.profileCard}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={{ uri: patientDetails?.avatar }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.title}>{patientDetails?.username}</Text>
              </View>
              <Text style={[styles.title, { fontSize: 12 }]}>
                {patientDetails?.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 80,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 14,
            }}
          >
            <View style={styles.item}>
              <Text style={[styles.subTitle, { fontSize: 14 }]}>Age</Text>
              <Text style={styles.text}>{patientDetails?.age}</Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.subTitle, { fontSize: 14 }]}>Disease</Text>
              <Text style={styles.text}>{patientDetails?.disease}</Text>
            </View>
            <View style={[styles.item, { borderRightWidth: 0 }]}>
              <Text style={[styles.subTitle, { fontSize: 14 }]}>Gender</Text>
              <Text style={styles.text}>{patientDetails?.gender}</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 14 }}>
          <Text style={styles.subTitle}>Patient Medical Reports</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 14,
            marginTop: 10,
            width: "100%",
          }}
        >
          {reports.map((item, index) => (
            <TouchableOpacity
              style={styles.images}
              onPress={() => {
                setImg(item);
                setVisible(true);
                // console.log(item);
              }}
            >
              <Image
                source={{ uri: item.report }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Dialog
        overlayStyle={{
          width: "94%",
          height: 500,
          padding: 0,
          paddingBottom: 0,
        }}
        onBackdropPress={() => setVisible(false)}
        visible={visible}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <Image
          source={{ uri: img?.report }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: "#f9f9f9",
  },
  backArrow: {
    width: 30,
    height: 30,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },

  title: {
    fontFamily: "MontserratMedium",
    marginBottom: 2,
    fontSize: 18,
  },
  subTitle: {
    fontFamily: "MontserratMedium",
    marginBottom: 2,
    fontSize: 16,
    marginTop: 14,
  },
  text: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#777",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    paddingVertical: 10,
  },
  item: {
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    width: "33.33%",
  },
  images: {
    width: "33.33%",
    height: Dimensions.get("screen").width / 3.2,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
