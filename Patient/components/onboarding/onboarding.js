import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
const { width, height } = Dimensions.get("screen");
export default function Onboarding() {
  const navigation = useNavigation();
  const user = "Muhammad shoaib";
  const data = [
    {
      title: "Find a doctor",
      description:
        "Discover and connect with trusted doctors online and in-clinic for convenient and personalized care",
      image: require("../../assets/images/doctor1.jpeg"),
    },
    {
      title: "Lab test and discounts",
      description:
        "Save on lab test with exclusive discounts, compare prices across labs, and enjoy the convenience of home sampling.",
      image: require("../../assets/images/bloodtest.png"),
    },
    {
      title: "Weight loss clinic",
      description:
        "Achieve health goal with expert guidance, personalize programs, ongoing support and a monthly/quarterly subscription plan.",
      image: require("../../assets/images/doctor2.jpeg"),
    },
    {
      title: "Medicine made easy",
      description:
        "Access medications hassle-free with discounts, home delivery, and convenient subscription plans.",
      image: require("../../assets/images/alexandr-podvalny-tE7_jvK-_YU-unsplash.jpeg"),
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width,
                height,
              }}
              key={index}
            >
              <LinearGradient
                colors={["transparent", "#f8f8f8"]}
                style={{
                  width,
                  height: width * 1.2,
                  position: "absolute",
                  zIndex: 11,
                }}
              ></LinearGradient>
              <Image
                source={item.image}
                style={{ width, height: width * 1.2 }}
              />
              <View
                style={{
                  paddingHorizontal: 14,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "MontserratBold",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  numberOfLines={4}
                  onPress={async () => {
                    alert(await AsyncStorage.getItem("userType"));
                  }}
                  style={{
                    marginTop: 10,
                    fontSize: 16,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          paddingBottom: 8,
        }}
      >
        <TouchableHighlight
          style={styles.continue}
          onPress={async () => {
            await AsyncStorage.setItem("userExistToken", "userExistToken");
            navigation.replace("SelectionScreen");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "MontserratMedium",
            }}
          >
            Continue
          </Text>
        </TouchableHighlight>
        <Text
          style={{
            color: "teal",
            alignSelf: "center",
            marginTop: 4,
            textDecorationLine: "underline",
            fontFamily: "MontserratMedium",
          }}
          onPress={() => navigation.replace("DrawerNavigator", { user })}
        >
          Quickly explore the app? Tap here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continue: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "teal",
    borderRadius: 6,
    marginHorizontal: 20,
    bottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 80,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
