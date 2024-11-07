import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Image } from "react-native";
import axios from "axios";
import { IP_ADDRESS } from "../../../db/IP";
import DoctorCard from "../../userprofile/custom/DoctorCard";
import { useDispatch } from "react-redux";
import { addToFav } from "../../../redux/action/actions";

export default function Fever({ route }) {
  const { headerTitle } = route.params;
  // console.log(headerTitle);
  const navigation = useNavigation();
  const [allDoctors, setAllDoctors] = useState([]);
  const [value, setValue] = useState(0);
  // console.log("3" - "2");

  const dateTime = new Date();
  const currentDate = dateTime.getFullYear();
  // console.log(typeof currentDate);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const dispatch = useDispatch();
  const addItem = (item) => {
    dispatch(addToFav(item));
  };
  const fetchDoctors = async () => {
    await axios.get(`${IP_ADDRESS}/api/doc/get_doctors`).then((res) => {
      // console.log(res.data);
      setAllDoctors(res.data);
    });
  };

  function NearMe() {
    // detect user current city location
    const [error, setError] = useState("");
    const [city, setCity] = useState(null);
    const [nearMe, setNearMe] = useState([]);

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location is required!");
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        const { longitude, latitude } = location.coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (response.length > 0) {
          const address = response[0];
          // console.log(address);
          setCity(address.subregion || address.country);
        }
      } catch (e) {
        setError(e.message);
      }
    };

    useEffect(() => {
      getLocation();
      fetchDoctorsByCity(city);
    }, [city]);

    const fetchDoctorsByCity = async (cityName) => {
      try {
        const response = await axios.get(
          `${IP_ADDRESS}/api/doc/sign_up/${cityName}`
        );
        setNearMe(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching doctors by city name : ", error.message);
        return;
      }
    };
    return (
      <View>
        <Text
          style={{
            marginHorizontal: 14,
            fontFamily: "MontserratMedium",
            marginTop: 5,

            color: "slategray",
          }}
        >
          Doctors in {city}!
        </Text>
        {nearMe.length < 1 ? (
          <View style={styles.loadingPage}>
            <Image
              source={require("../../../assets/images/spinner.gif")}
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
            <Text style={{ fontFamily: "MontserratMedium" }}>
              Fetching doctors by location!
            </Text>
          </View>
        ) : (
          nearMe.map((item, index) => {
            return (
              <DoctorCard
                bio={item?.bio}
                doctor_name={item?.name}
                experience={item?.experience}
                image={{ uri: item?.image }}
                onPress={() => navigation.navigate("DocDetails", { item })}
                patients={item?.patients || "NaN"}
                rating={item?.rating + "+"}
                review={item?.reviews}
                specialist={item?.specialist}
                key={index}
                status={item?.status}
                iconName={"heart-outline"}
                onIconPress={() => {
                  addItem(item);
                  ToastAndroid.show("Added to favorite!", ToastAndroid.LONG);
                }}
              />
            );
          })
        )}
      </View>
    );
  }

  function AllDoctors() {
    return (
      <View>
        {allDoctors.map((item, index) => {
          // console.log(currentDate - parseInt(item?.workingSince));
          return (
            <DoctorCard
              bio={item?.bio}
              doctor_name={item?.name}
              experience={currentDate - item?.workingSince}
              image={{ uri: item?.image }}
              onPress={() => navigation.navigate("DocDetails", { item })}
              patients={item?.patients || "NaN"}
              rating={item?.rating + "+"}
              specialist={item?.specialist}
              key={index}
              iconName={"heart-outline"}
              status={item?.status}
              onIconPress={() => {
                addItem(item);
                ToastAndroid.show("Added to favorite!", ToastAndroid.LONG);
              }}
            />
          );
        })}
      </View>
    );
  }

  const renderDoctors = () => {
    if (value === 0) {
      return <AllDoctors />;
    } else {
      return <NearMe />;
    }
  };

  return (
    <SafeAreaView>
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
          {headerTitle}
        </Text>
        <Text style={{}}></Text>
      </View>
      <View style={styles.listOfDoc}>
        <TouchableOpacity
          onPress={() => {
            setValue(0);
          }}
          activeOpacity={0.2}
          style={[
            styles.btn,
            {
              borderRightWidth: 1,
              borderColor: "#ddd",
              height: 40,
            },
          ]}
        >
          {value === 0 ? <View style={styles.dot}></View> : ""}
          <Text
            style={[styles.textBtn, { color: value === 0 ? "teal" : "#333" }]}
          >
            All Doctors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          style={[styles.btn, { height: 40 }]}
          onPress={() => {
            setValue(1);
          }}
        >
          {value === 1 ? <View style={styles.dot}></View> : ""}
          <Text
            style={[styles.textBtn, { color: value === 1 ? "teal" : "#333" }]}
          >
            Near Me
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {renderDoctors()}
      </ScrollView>
    </SafeAreaView>
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
  listOfDoc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginBottom: 6,
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 4,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderBottomColor: "teal",
  },
  textBtn: {
    fontFamily: "MontserratMedium",
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "teal",
    position: "absolute",
    left: 20,
    borderRadius: 20,
    shadowColor: "cyan",
    elevation: 20,
  },
  loadingPage: {
    width: "100%",
    height: 600,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: 100,
  },
});
