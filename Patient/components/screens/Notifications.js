import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Notify from "../userprofile/custom/Notify";
import { style } from "../../Theme";
import { IP_ADDRESS } from "../../db/IP";

export default function Notifications({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  const userId = params?.user?._id;
  // console.log(userId);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getAppointmentsByUserId(userId);
  }, []);
  const getAppointmentsByUserId = async (userID) => {
    try {
      await fetch(`${IP_ADDRESS}/api/appointments/${userID}`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data);
          console.log(data);
        });
    } catch (error) {
      console.log("Error fetching appointments 🥺 :", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[style.header, { backgroundColor: "#f9f9f9" }]}>
        <TouchableOpacity
          style={style.headerBackBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} />
        </TouchableOpacity>
        <Text style={style.header_text}>Notifications</Text>
      </View>
      {notifications.length < 1 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 22,
              opacity: 0.3,
            }}
          >
            No notification yet!
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              marginLeft: 14,
              fontSize: 14,
              fontFamily: "MontserratMedium",
              marginBottom: 6,
            }}
          >
            Today
          </Text>

          <FlatList
            data={notifications}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Notify
                  time={item?.day}
                  title={"Serial Reminder"}
                  notify={`Your appointment will start at ${item?.time}. Stay with app and take care.`}
                />
              );
            }}
          />
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
});
