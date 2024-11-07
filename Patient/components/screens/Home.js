import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Symptoms from "../userprofile/Symptoms";
import Category from "./Category";
import DoctorView from "./DoctorView";
import { IP_ADDRESS } from "../../db/IP";
import * as Animatable from "react-native-animatable";

export default function Home({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  // Use params as needed
  // console.log("home params", params);
  const disease = params?.user?.disease;
  // console.log(disease);

  const time = new Date();
  const currentTime = time.getHours();

  const [refreshing, setRefreshing] = useState(false);
  const onRefreshed = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 4000);
    fetchData();
  };

  const [doctors, setDoctors] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetchData();
    getRecommendedDoctors();
  }, []);

  const fetchData = async () => {
    await axios.get(`${IP_ADDRESS}/api/doc/get_doctors`).then((res) => {
      setDoctors(res.data);
      // console.log(res.data);
    });
  };
  const onPressNavigate = (specialist) => {
    navigation.navigate("AllSpecialist", { specialist });
  };

  const getRecommendedDoctors = async () => {
    try {
      await axios
        .get(`${IP_ADDRESS}/api/doc/recommendations?condition=${disease}`)
        .then((res) => {
          setRecommended(res.data);
          // console.log(res.data);
        });
    } catch (err) {
      console.log("Error getting recommended doctors", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={[styles.header]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: params?.user?.avatar }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#eee",
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ opacity: 0.6, fontFamily: "MontserratRegular" }}>
                {currentTime < 12
                  ? "Good Morning"
                  : currentTime >= 12 && currentTime < 15
                  ? "Good Afternoon"
                  : "Good Evening"}
              </Text>
              <Text style={{ opacity: 0.6, fontFamily: "MontserratMedium" }}>
                {params?.user?.username || "Unknown"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => navigation.navigate("SearchDoc")}
          >
            <AntDesign name="search1" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications-outline" size={20} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <ScrollView
        style={{ backgroundColor: "#f9f9f9" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefreshed()}
          />
        }
      >
        <View
          style={{
            paddingHorizontal: 14,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "MontserratMedium", fontSize: 18 }}>
            Promotions
          </Text>
        </View>
        <LinearGradient
          style={{
            width: Dimensions.get("screen").width - 24,
            height: 150,
            borderRadius: 10,
            overflow: "hidden",
            alignSelf: "center",
            marginTop: 10,
          }}
          start={{ x: 0.3, y: 0.1 }}
          colors={["#00c4c4", "teal"]}
        >
          <View
            style={{
              width: Dimensions.get("screen").width - 24,
              height: 150,
              flexDirection: "row",
            }}
          >
            <View style={{ padding: 20, flex: 0.6 }}>
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                Get a free medical advice by asking a doctor
              </Text>
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 10,
                  color: "#333",
                }}
              >
                Ask a question anonymously
              </Text>
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontSize: 10,
                  marginBottom: 5,
                  color: "#333",
                }}
              >
                Get a reply from qualified doctors
              </Text>
              <LinearGradient
                style={[styles.touchable, { marginTop: 10 }]}
                start={{ x: 0.5, y: 0.1 }}
                colors={["#00c4c4", "teal"]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Help")}
                  // onPress={handleDelete}
                  style={styles.touchable}
                >
                  <Text
                    style={{
                      fontFamily: "MontserratRegular",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    Ask a Question
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ flex: 0.4 }}>
              <Image
                source={require("../../assets/images/pngwing.com-4.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  // tintColor: "teal",
                }}
                resizeMode="cover"
              />
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            paddingHorizontal: 14,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "MontserratMedium", fontSize: 18 }}>
            Specialist
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Specialist");
              // alert("Not yet added");
            }}
          >
            <Text style={{ fontFamily: "MontserratRegular" }}>See All</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Category
            image={require("../../assets/images/pngegg (1).png")}
            name="Cardiologist"
            onPress={() => onPressNavigate("Cardiologist")}
          />
          <Category
            image={require("../../assets/images/radiology.png")}
            name="Radiologist"
            onPress={() => onPressNavigate("Radiologist")}
          />
          <Category
            image={require("../../assets/images/pngwing.com (4).png")}
            name="Neurologist"
            onPress={() => onPressNavigate("Neurologist")}
          />
          <Category
            image={require("../../assets/images/floss.png")}
            name="Dentist"
            onPress={() => onPressNavigate("Dentist")}
          />
        </View>
        <Text
          style={{
            marginLeft: 14,
            fontFamily: "MontserratMedium",
            fontSize: 18,
            marginTop: 10,
          }}
          // onPress={() => fetchDoctorsByType("Dentist")}
        >
          Popular Doctors
        </Text>
        <FlatList
          data={doctors}
          horizontal
          contentContainerStyle={{ paddingLeft: 14 }}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View
                animation={"fadeInRight"}
                delay={index * 200}
                duration={1000}
              >
                <DoctorView
                  name={item?.name}
                  image={item?.image}
                  specialist={item?.specialist}
                  rating={item?.rating + ".0"}
                  reviews={item?.city}
                  status={item?.status}
                  onPress={() =>
                    navigation.navigate("DocDetails", { item, params })
                  }
                />
              </Animatable.View>
            );
          }}
        ></FlatList>
        <View
          style={{
            paddingHorizontal: 14,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "MontserratMedium", fontSize: 18 }}>
            Symptoms
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
          contentContainerStyle={{ paddingLeft: 14 }}
        >
          <Symptoms
            image={require("../../assets/images/fever.png")}
            name="Fever"
            onPress={() =>
              navigation.navigate("Fever", { headerTitle: "Fever" })
            }
          />
          <Symptoms
            image={require("../../assets/images/heart.png")}
            name="Heart Attack"
            onPress={() =>
              navigation.navigate("Fever", { headerTitle: "Heart Attack" })
            }
          />
          <Symptoms
            image={require("../../assets/images/mother.png")}
            name="Pregnancy"
            onPress={() =>
              navigation.navigate("Fever", { headerTitle: "Pregnancy" })
            }
          />
          <Symptoms
            image={require("../../assets/images/examination.png")}
            name="High blood Pressure"
            onPress={() =>
              navigation.navigate("Fever", { headerTitle: "Blood Pressure" })
            }
          />
          <Symptoms
            image={require("../../assets/images/stress.png")}
            name="Diarrhea"
            onPress={() =>
              navigation.navigate("Fever", { headerTitle: "Diarrhea" })
            }
          />
          <Symptoms
            image={require("../../assets/images/dengue.png")}
            name="Dengue"
            onPress={() =>
              navigation.navigate("Fever", { headerTitle: "Dengue" })
            }
          />
        </ScrollView>
        {recommended.length > 0 && (
          <View>
            <Text
              style={{
                marginLeft: 14,
                fontFamily: "MontserratMedium",
                fontSize: 18,
                marginTop: 10,
              }}
              // onPress={() => fetchDoctorsByType("Dentist")}
            >
              Recommended for you
            </Text>
            <FlatList
              data={recommended}
              horizontal
              contentContainerStyle={{ paddingLeft: 14 }}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
              renderItem={({ item, index }) => {
                return (
                  <DoctorView
                    name={item?.name}
                    image={item?.image}
                    specialist={item?.specialist}
                    rating={item?.rating + ".0"}
                    reviews={item?.city}
                    status={item?.status}
                    onPress={() =>
                      navigation.navigate("DocDetails", { item, params })
                    }
                  />
                );
              }}
            ></FlatList>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 14,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontFamily: "MontserratMedium",
                marginTop: 10,
                fontSize: 20,
              }}
              onPress={getRecommendedDoctors}
            >
              Why HotDoc?
            </Text>
            <Text style={{ fontFamily: "MontserratRegular", marginTop: 10 }}>
              1. PMC Verified doctors {doctors.length}+ doctors available
            </Text>
            <Text style={{ fontFamily: "MontserratRegular", marginTop: 10 }}>
              2. 12/7 hours customer support well trained team
            </Text>
            <Text style={{ fontFamily: "MontserratRegular", marginTop: 10 }}>
              3. Secure online payments SSL-encrypted
            </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Image
              source={require("../../assets/images/beam.gif")}
              style={{ width: "100%", height: 250 }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 14,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "MontserratMedium", fontSize: 16 }}>
            Follow us
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            paddingHorizontal: 14,
          }}
        >
          <TouchableOpacity
            style={styles.btnBox}
            onPress={() => {
              navigation.navigate("WebViews");
            }}
          >
            <FontAwesome name="facebook" size={30} color="blue" />
            <Text style={{ fontFamily: "MontserratRegular", fontSize: 8 }}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBox}>
            <FontAwesome name="youtube-play" size={30} color="red" />
            <Text style={{ fontFamily: "MontserratRegular", fontSize: 8 }}>
              Youtube
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBox}>
            <FontAwesome name="twitter" size={30} color="#6fc1ff" />
            <Text style={{ fontFamily: "MontserratRegular", fontSize: 8 }}>
              Twitter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBox}>
            <FontAwesome name="instagram" size={30} color="red" />
            <Text style={{ fontFamily: "MontserratRegular", fontSize: 8 }}>
              Instagram
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBox}>
            <FontAwesome name="github" size={30} />
            <Text style={{ fontFamily: "MontserratRegular", fontSize: 8 }}>
              GitHub
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  btnBox: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  inputBar: {
    marginHorizontal: 14,
    borderRadius: 50,
    height: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "MontserratRegular",
  },
  category: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    borderRadius: 5,
  },
});
