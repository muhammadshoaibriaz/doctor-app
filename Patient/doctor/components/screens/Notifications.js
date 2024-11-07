import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Card from "../userprofile/custom/card";
import { IP_ADDRESS } from "../../../db/IP";
import axios from "axios";

export default function Notifications({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  const doctorIds = params?.docUser?._id;
  // console.log("params", params);
  const [docAppointments, setDocAppointments] = useState([]);

  // console.log("docAppointments", docAppointments);
  useEffect(() => {
    getBookedAppointments(doctorIds);
  }, [doctorIds]);

  const getBookedAppointments = async (doctorId) => {
    try {
      await fetch(`${IP_ADDRESS}/api/appointments/sign_up/${doctorId}`)
        .then((res) => res.json())
        .then((data) => {
          setDocAppointments(data);
        });
    } catch (error) {
      console.log("Error fetching appointment", error.message);
    }
  };

  const dateTime = new Date();

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(
        `${IP_ADDRESS}/api/appointments/${appointmentId}/status`,
        {
          status,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating appointment status:", error);
      throw error;
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
            marginRight: 40,
          }}
        >
          Notifications
        </Text>
        <Text style={{}}></Text>
      </View>
      <Text
        style={{
          marginLeft: 14,
          fontSize: 14,
          fontFamily: "MontserratMedium",
        }}
      >
        {docAppointments[0]?.booked_time === dateTime.toTimeString()
          ? "Today"
          : docAppointments[0]?.booked_time}
      </Text>

      {docAppointments.length < 1 ? (
        <View style={styles.appointment}>
          <Image
            source={{
              uri: "https://ouch-cdn2.icons8.com/EAx_DerhY0Vz_dOPZ7zPATd34M8ND6uTclhde2O-Pt8/rs:fit:368:421/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTQ4/LzhmMTEzYjhhLWY3/ODMtNGJmOC1iMzc0/LTdmODFjMzZmMzJh/Mi5zdmc.png",
            }}
            style={{
              width: 150,
              height: 150,
              objectFit: "contain",
              marginBottom: 30,
            }}
          />
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 20,
              opacity: 0.4,
            }}
          >
            No Notifications Yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={docAppointments}
          contentContainerStyle={{ paddingHorizontal: 14 }}
          renderItem={({ item, index }) => {
            return (
              <Card
                name={item?.patient_name}
                image={{ uri: item?.patient_image }}
                specialist={item?.specialist}
                hospital={item?.hospital}
                time={item?.time}
                disease={item?.problem}
                email={item?.email}
                age={item?.age}
                day={item?.day}
                status={item?.status}
                onPress={() => navigation.navigate("PatientDetails", { item })}
                accept={() => {
                  updateAppointmentStatus(item?._id, "accepted");
                  getBookedAppointments(doctorIds);
                }}
                reject={() => {
                  updateAppointmentStatus(item?._id, "rejected");
                  getBookedAppointments(doctorIds);
                }}
                done={() => {
                  updateAppointmentStatus(item?._id, "done");
                  getBookedAppointments(doctorIds);
                }}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 14,
  },
  box: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  appointment: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
