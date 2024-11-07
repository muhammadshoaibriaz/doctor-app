import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
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
import { useNavigation } from "@react-navigation/native";
import { IP_ADDRESS } from "../../../db/IP";

export default function MyProfile({ route }) {
  const { params } = route;
  console.log("Profile params", params);
  const user = params?.docUser;
  // console.log("user", user);
  const [hospitals, setHospitals] = useState([]);
  const [image, setImage] = useState(null);
  const [patients, setPatients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigation = useNavigation();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const scrollY = useRef(new Animated.Value(0)).current;
  var elevation;
  elevation = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: [0, 10],
    extrapolate: "clamp",
  });

  useEffect(() => {
    getBookedAppointments(user?._id);
    getReviews(user?._id);
  }, []);

  const getBookedAppointments = async (doctorId) => {
    try {
      await fetch(`${IP_ADDRESS}/api/appointments/sign_up/${doctorId}`)
        .then((res) => res.json())
        .then((data) => {
          setPatients(data);
        });
    } catch (error) {
      console.log("Error fetching appointment", error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
    getBookedAppointments();
  };

  const getReviews = async (doctorId) => {
    try {
      await fetch(`${IP_ADDRESS}/api/doc/reviews/${doctorId}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
        });
    } catch (error) {
      console.log("Error fetching reviews", error.message);
    }
  };

  return (
    <SafeAreaView role="feed">
      <Animated.View
        style={[styles.header, { elevation, shadowColor: "#000" }]}
      >
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          My Profile
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{
            width: 35,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
          }}
        >
          <FontAwesome name="bell-o" size={16} />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          <View style={styles.profileCard}>
            <TouchableOpacity onPress={pickImage}>
              <Image source={{ uri: user?.image }} style={styles.image} />
            </TouchableOpacity>
            <View style={{ marginLeft: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.title}>{user?.name}</Text>
                {user?.status === "accepted" ? (
                  <Image
                    source={require("../../assets/images/verified.png")}
                    style={{
                      width: 16,
                      height: 16,
                      marginLeft: 2,
                      tintColor: "teal",
                    }}
                  ></Image>
                ) : null}
              </View>
              <Text style={[styles.title, { fontSize: 12 }]}>
                {user?.specialist}
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
              <Text style={[styles.subTitle, { fontSize: 14 }]}>Patients</Text>
              <Text style={styles.text}>
                {patients?.length ? patients?.length : 0}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.subTitle, { fontSize: 14 }]}>
                Experience
              </Text>
              <Text style={styles.text}>
                {user?.workingSince
                  ? new Date().getFullYear() - user?.workingSince
                  : ""}{" "}
                years exp
              </Text>
            </View>
            <View style={[styles.item, { borderRightWidth: 0 }]}>
              <Text style={[styles.subTitle, { fontSize: 14 }]}>Reviews</Text>
              <Text style={styles.text}>{reviews.length}</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 14 }}>
          <Text style={styles.subTitle}>Specialized In</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 4,
            }}
          >
            {user?.services.map((item) => (
              <Text
                key={item}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 5,
                  borderRadius: 30,
                  backgroundColor: "#fff",
                  width: "auto",
                  // borderWidth: 0.5,
                  borderColor: "#eee",
                  marginRight: 6,
                  marginVertical: 4,
                  fontFamily: "MontserratRegular",
                }}
              >
                {item}
              </Text>
            ))}
          </View>
          <Text style={styles.subTitle}>Bio</Text>
          <Text style={styles.text}>{user?.bio}</Text>
          <Text style={styles.subTitle}>Speciality</Text>
          <Text style={styles.text}>{user?.specialist}</Text>
          <Text style={styles.subTitle}>Email</Text>
          <Text style={styles.text}>{user?.email}</Text>
          <Text style={styles.subTitle}>Phone No</Text>
          <Text style={styles.text}>{user?.phone_number}</Text>
          <Text style={styles.subTitle}>Date of birth</Text>
          <Text style={styles.text}>{user?.dateOfBirth}</Text>
        </View>
      </ScrollView>
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
    justifyContent: "space-between",
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
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  item: {
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    width: "33.33%",
  },
});
