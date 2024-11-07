import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../userprofile/custom/card";
import PastCard from "../userprofile/custom/PastCard";
import { useEffect } from "react";
import { IP_ADDRESS } from "../../db/IP";
import axios from "axios";

export default function BookedAppointments({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();
  const userId = user._id;
  // console.log(userId);
  const date = new Date();
  const [value, setValue] = useState(1);
  const [upcomingAppointment, setUpcomingAppointment] = useState([]);
  const [past, setPast] = useState([]);
  // console.log("Past appointments", past);

  const getAppointmentsByUserId = async (userID) => {
    try {
      await fetch(`${IP_ADDRESS}/api/appointments/${userID}`)
        .then((res) => res.json())
        .then((data) => {
          // setUpcomingAppointment(data);
          // console.log(data);
          const appointments = data;
          const currentDate = new Date();
          // Filter appointments into upcoming and past
          const upcoming = appointments.filter(
            (appointment) =>
              appointment.booked_time == currentDate.toDateString()
          );
          const past = appointments.filter(
            (appointment) =>
              appointment.booked_time != currentDate.toDateString()
          );
          setPast(past);
          setUpcomingAppointment(upcoming);
        });
    } catch (error) {
      console.log("Error fetching appointments 🥺 :", error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getAppointmentsByUserId(userId).finally(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    getAppointmentsByUserId(userId);
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${IP_ADDRESS}/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Handle successful deletion on the frontend
        console.log("Appointment deleted successfully!");
        getAppointmentsByUserId(userId);
      } else {
        // Handle error response from server
        console.log("Appointment not deleted successfully!");
      }
    } catch (error) {
      // Handle network errors
      console.log("Error deleting appointment : ", error);
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const RenderComponent = () => {
    if (value === 1) {
      return <Upcoming />;
    } else {
      return <Past />;
    }
  };
  const Upcoming = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "MontserratRegular", fontSize: 12 }}>
          Today - {date.getDate()} {months[date.getMonth()]}{" "}
          {date.getFullYear()}
        </Text>
        {upcomingAppointment.length < 1 ? (
          <View style={styles.emptyPage}>
            <Image
              source={require("../../assets/images/examination.png")}
              style={{
                width: 300,
                height: 300,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 20,
                color: "#999",
              }}
            >
              No appointment booked yet!
            </Text>
          </View>
        ) : (
          <FlatList
            data={upcomingAppointment}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              ></RefreshControl>
            }
            contentContainerStyle={{
              minHeight: 600,
            }}
            renderItem={({ item, index }) => {
              return (
                <Card
                  name={item?.doctor_name}
                  status={item?.status}
                  image={{ uri: item?.doc_image }}
                  description={`${item?.specialist} - ${item?.hospital}`}
                  time={item?.time}
                  day={item?.day}
                  reviews={item?.reviews}
                  onLongPress={() => {
                    Alert.alert(
                      "Delete?",
                      "Do you want to delete this appointment?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => {},
                        },
                        {
                          text: "Yes",
                          onPress: () => handleDelete(item?._id),
                        },
                      ]
                    );
                  }}
                />
              );
            }}
          />
        )}
      </View>
    );
  };
  const Past = () => {
    // console.log("Past appointment", past);
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "MontserratRegular", fontSize: 12 }}>
          {past[0]?.booked_time}
        </Text>
        {past.length < 1 ? (
          <View
            style={{
              width: "100%",
              height: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 20,
                opacity: 0.3,
              }}
            >
              No past appointments!
            </Text>
          </View>
        ) : (
          <FlatList
            data={past}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <PastCard
                  name={item?.doctor_name}
                  image={{ uri: item?.doc_image }}
                  description={`${item?.specialist} - Surat Medical College Hospital`}
                  status={item?.status}
                  time={item?.time}
                  day={item?.booked_time}
                  reviews={item?.reviews}
                  // verified={"Approved"}
                />
              );
            }}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: 14,
        flex: 1,
        backgroundColor: "#f9f9f9",
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-sharp" size={22} />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            fontFamily: "MontserratMedium",
            fontSize: 18,
            marginRight: 25,
          }}
          onPress={() => getAppointmentsByUserId(userId)}
        >
          My Appointments
        </Text>
        <View></View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              borderBottomWidth: 1.5,
              borderBottomColor: value == 1 ? "teal" : "transparent",
            },
          ]}
          onPress={() => setValue(1)}
        >
          <Text style={{ fontFamily: "MontserratMedium" }}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              borderBottomWidth: 1.5,
              borderBottomColor: value == 2 ? "teal" : "transparent",
            },
          ]}
          onPress={() => setValue(2)}
        >
          <Text style={{ fontFamily: "MontserratMedium" }}>Past</Text>
        </TouchableOpacity>
      </View>
      <RenderComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  btn: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },

  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 10,
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
  emptyPage: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
});
