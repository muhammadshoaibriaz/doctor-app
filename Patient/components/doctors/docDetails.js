import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
  FlatList,
  LayoutAnimation,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToFav } from "../../redux/action/actions";
import { SafeAreaView } from "react-native-safe-area-context";
import { IP_ADDRESS } from "../../db/IP";
import FeeCard from "../userprofile/custom/FeeCard";

const { width, height } = Dimensions.get("screen");

const ITEM_WIDTH = width / 3;
export default function DocDetails({ route }) {
  const { item, params } = route.params;
  const user = params?.user;
  // console.log("item ares", user);
  const navigation = useNavigation();
  const [patient, setPatient] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const dateTime = new Date();
  const [dayIndex, setDayIndex] = useState();
  const [fee, setFee] = useState("");
  const [value, setValue] = useState(null);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}/api/doc/reviews/${item._id}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.log("Error getting reviews", error.message);
    }
  };

  const dispatch = useDispatch();
  const addItem = (item) => {
    dispatch(addToFav(item));
  };

  useEffect(() => {
    getBookedAppointments(item?._id);
  }, []);

  const getBookedAppointments = async (doctorId) => {
    try {
      await fetch(`${IP_ADDRESS}/api/appointments/sign_up/${doctorId}`)
        .then((res) => res.json())
        .then((data) => {
          setPatient(data);
        });
    } catch (error) {
      console.log("Error fetching appointment", error.message);
    }
  };

  const OnPress = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getDay = new Date().getDay();
  // console.log(getDay);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 18,
            marginRight: 40,
          }}
        >
          Doctor details
        </Text>
        <Text style={{}}></Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8 }}
      >
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 14,
          }}
        >
          <View style={[styles.card, {}]}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: 10,
                zIndex: 1,
              }}
              onPress={() => {
                addItem(item);
                ToastAndroid.show("Added to favorite", 3000);
              }}
            >
              <Ionicons name="heart-outline" color={"#fff"} size={18} />
            </TouchableOpacity>
            <Image
              source={{ uri: item?.image }}
              style={{
                width: ITEM_WIDTH,
                height: "100%",
                resizeMode: "cover",
                backgroundColor: "#eee",
                borderRadius: 10,
              }}
            />
            <View style={styles.details}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.name}>{item?.name} </Text>
                {item?.status === "accepted" && (
                  <Image
                    source={require("../../assets/images/verified.png")}
                    style={{
                      width: 14,
                      resizeMode: "contain",
                      height: 14,
                      tintColor: "teal",
                    }}
                  />
                )}
              </View>
              <Text style={styles.specialist}>{item?.specialist}</Text>
              <Text numberOfLines={2} style={styles.description}>
                {item?.bio}
              </Text>
              <View style={[styles.docDetails]}>
                <TouchableOpacity
                  style={styles.box}
                  onPress={() =>
                    // alert("Please book appointment first to make a call.")
                    alert(`You can call me at ${item?.phone_number}`)
                  }
                >
                  <Feather name="phone" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.box}
                  onPress={() => console.log(item?._id)}
                >
                  <Feather name="video" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.box}
                  onPress={() =>
                    navigation.navigate("Chat", { data: item, user })
                  }
                >
                  <Feather name="message-circle" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={styles.item}>
              <Text style={styles.patient}>Patients</Text>
              <Text style={styles.title}>{patient.length}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.patient}>Experience</Text>
              <Text style={styles.title}>
                {dateTime.getFullYear() - item?.workingSince}+ years
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.patient}>Reviews</Text>
              <Text style={styles.title}>
                {!reviews ? "No reviews yet" : reviews.length + "+"}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 14 }}>
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 18,
              marginBottom: 8,
            }}
          >
            Biography
          </Text>
          <Text style={{ fontFamily: "MontserratRegular" }}>{item?.bio}</Text>
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 18,
              marginTop: 24,
              marginBottom: 5,
            }}
          >
            Working Hours
          </Text>
          <Text style={{ fontFamily: "MontserratMedium", color: "#888" }}>
            From {item?.timing}
            {"-"}to {item?.ending}
          </Text>
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 18,
              marginTop: 24,
              marginBottom: 8,
            }}
          >
            Appointment Fees
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FeeCard
              title={"Video consultation"}
              fees={item?.videoConsultationFee}
              icon={"videocam-outline"}
              iconName={"video-outline"}
              onPress={() => {
                setFee(item?.videoCallFee);
                ToastAndroid.show(
                  `Fees Selected ${item?.videoConsultationFee}!`,
                  ToastAndroid.LONG
                );
                setValue(0);
              }}
              startTime={item?.timing}
              timingIcon={"time-outline"}
              endTime={item?.ending}
              available={"Available today"}
              style={{
                borderWidth: 1,
                borderColor: value === 0 ? "teal" : "transparent",
              }}
            />
            <FeeCard
              title={"Home visit"}
              fees={item?.visitFee}
              icon={"home-outline"}
              iconName={"video-outline"}
              onPress={() => {
                setFee(item?.visitFee);
                ToastAndroid.show(
                  `Fees Selected ${item?.visitFee}!`,
                  ToastAndroid.LONG
                );
                setValue(1);
              }}
              style={{
                borderWidth: 1,
                borderColor: value === 1 ? "teal" : "transparent",
              }}
              available={"Available today"}
              startTime={item?.timing}
              timingIcon={"time-outline"}
              endTime={item?.ending}
            />
            <FeeCard
              title={"Video call"}
              fees={item?.videoCallFee}
              icon={"videocam-outline"}
              iconName={"video-outline"}
              onPress={() => {
                setFee(item?.videoCallFee);
                ToastAndroid.show(
                  `Fees Selected ${item?.videoCallFee}!`,
                  ToastAndroid.LONG
                );
                setValue(2);
              }}
              available={"Available today"}
              startTime={item?.timing}
              timingIcon={"time-outline"}
              endTime={item?.ending}
              style={{
                borderWidth: 1,
                borderColor: value === 2 ? "teal" : "transparent",
              }}
            />

            <FeeCard
              title={"Text messages"}
              fees={item?.textFee}
              icon={"chatbubble-ellipses-outline"}
              iconName={"video-outline"}
              onPress={() => {
                setFee(item?.textFee);
                ToastAndroid.show(
                  `Fees Selected ${item?.textFee}!`,
                  ToastAndroid.LONG
                );
                setValue(3);
              }}
              style={{
                borderWidth: 1,
                borderColor: value === 3 ? "teal" : "transparent",
              }}
              available={"Available today"}
              startTime={item?.timing}
              timingIcon={"time-outline"}
              endTime={item?.ending}
            />
            <FeeCard
              title={"Phone call"}
              fees={item?.phoneCallFee}
              icon={"call-outline"}
              iconName={"video-outline"}
              onPress={() => {
                setFee(item?.phoneCallFee);
                ToastAndroid.show(
                  `Fees Selected ${item?.phoneCallFee}!`,
                  ToastAndroid.LONG
                );
                setValue(4);
              }}
              style={{
                borderWidth: 1,
                borderColor: value === 4 ? "teal" : "transparent",
              }}
              available={"Available today"}
              startTime={item?.timing}
              timingIcon={"time-outline"}
              endTime={item?.ending}
            />
          </ScrollView>
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 18,
              marginTop: 20,
              marginBottom: 8,
            }}
          >
            Days available
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item?.availability.map((item, index) => (
              <TouchableOpacity
                onPress={() => setDayIndex(index)}
                key={index}
                style={[
                  styles.items,
                  {
                    backgroundColor: index === dayIndex ? "teal" : "#fff",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    { color: index === dayIndex ? "#fff" : "teal" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={OnPress}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#00808016",
              paddingVertical: 14,
              paddingHorizontal: 14,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 16,
              }}
            >
              Patients Reviews
            </Text>
            <Ionicons
              name={open ? "chevron-up" : "chevron-down"}
              color="#777"
              size={24}
            />
          </TouchableOpacity>
          {open && (
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                marginTop: 20,
                paddingHorizontal: 14,
              }}
            >
              {reviews.map((item, index) => {
                // console.log("items", item);
                return (
                  <View style={styles.review} key={index}>
                    <Image
                      source={{ uri: item.patientImg }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 20,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: 8,
                        width: "90%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        {item.patientName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "MontserratMedium",
                          fontSize: 13,
                          color: "#666",
                        }}
                      >
                        {item.review}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 5,
          paddingHorizontal: 14,
        }}
      >
        <TouchableOpacity
          style={styles.chat}
          onPress={() =>
            navigation.navigate("Chat", {
              data: item,
              user,
            })
          }
        >
          <AntDesign name="message1" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.book}
          onPress={() =>
            navigation.navigate("PatientName", {
              newDay: item?.availability[dayIndex],
              newItem: item,
              fee,
              user,
            })
          }
        >
          <Text
            style={{
              fontFamily: "MontserratMedium",
              color: "#fff",
            }}
          >
            Book an Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 130,
    flexDirection: "row",
    marginTop: 10,
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  items: {
    width: 70,
    height: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#f3f3f3",
    marginRight: 5,
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  patient: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
  },
  details: {
    paddingLeft: 10,
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
  description: {
    fontSize: 12,
    width: 200,
    fontFamily: "MontserratMedium",
    marginTop: 5,
  },
  Details: {
    width: 190,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    width: 50,
    height: 35,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: 100,
    height: 70,
    borderRadius: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginRight: 5,
    fontFamily: "MontserratMedium",
    borderColor: "#efefef",
  },
  chat: {
    backgroundColor: "teal",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  book: {
    backgroundColor: "teal",
    width: 260,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    fontFamily: "MontserratBold",
    marginTop: 2,
  },
  docDetails: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  review: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
