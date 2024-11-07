import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import DoctorView from "../screens/DoctorView";

export default function HosDetails({ route }) {
  const { item } = route.params;
  console.log(item);
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={18} />
        </TouchableOpacity>
        <View style={{}}>
          <Text style={[styles.name, { marginRight: 35 }]}>
            Hospital details
          </Text>
        </View>
        <Text style={styles.name}></Text>
      </View>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: item?.image }}
          style={{ width: 80, height: 80, borderRadius: 10 }}
          resizeMode="cover"
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={[styles.name, { fontSize: 16, width: "90%" }]}>
            {item?.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              marginBottom: 2,
            }}
          >
            <Text style={{ fontFamily: "MontserratRegular" }}>
              {item?.rating}
            </Text>
            <AntDesign name="star" color={"orange"} size={12} />
            <AntDesign name="star" color={"orange"} size={12} />
            <AntDesign name="star" color={"orange"} size={12} />
            <AntDesign name="star" color={"orange"} size={12} />
            <AntDesign name="staro" color={"orange"} size={12} />
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Ionicons name="person-outline" style={{ marginRight: 4 }} />
            <Text style={styles.subtitle}>{item?.doctors?.length} doctors</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Ionicons name="alarm-outline" style={{ marginRight: 4 }} />
            <Text style={styles.subtitle}>{item?.timing}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 14,
          marginTop: 20,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 17, fontFamily: "MontserratMedium" }}>
          About
        </Text>
        <Text style={{ fontFamily: "MontserratRegular", textAlign: "justify" }}>
          {item?.about}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "MontserratMedium",
            marginTop: 12,
            marginBottom: 10,
          }}
        >
          Doctors in {item?.name}
        </Text>
        <FlatList
          data={item?.doctors}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <DoctorView
                name={item?.name}
                image={item?.image}
                specialist={item?.specialty}
                description={item?.about}
                totalPatient={item.patients}
                experience={item.experience}
                rating={item.rating}
                reviews={item.reviews}
                onPress={() => alert("Only readable by developers")}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
  },
  profileCard: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  name: {
    fontFamily: "MontserratMedium",
    fontSize: 18,
  },
  edit: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 8,
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginTop: 14,
  },
  inputBar: {
    marginHorizontal: 14,
    borderRadius: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    color: "#999",
  },
  title: {
    fontFamily: "MontserratMedium",
    fontSize: 13,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
    fontFamily: "MontserratRegular",
    width: "80%",
  },
});
