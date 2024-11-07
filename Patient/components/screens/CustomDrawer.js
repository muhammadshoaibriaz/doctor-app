import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Modal,
  ScrollView,
  Share,
  Vibration,
} from "react-native";
import { IP_ADDRESS } from "../../db/IP";
const CustomDrawer = ({ route }) => {
  const { user } = route;
  const navigation = useNavigation();
  const userId = user?._id;
  // console.log("user", user);

  const [visible, setVisible] = useState(false);
  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`${IP_ADDRESS}/api/user/${userId}`);
      console.log("User deleted successfully!", response.data);
      setVisible(!visible);
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error deleting account", error);
    }
  };

  return (
    <View style={styles.drawer}>
      <StatusBar translucent={false} backgroundColor="#f9f9f9" />
      <View style={styles.header}>
        <View style={styles.headerBar}>
          <Image
            source={
              { uri: user?.avatar } ||
              require("../../assets/images/tolgamendi.jpg")
            }
            style={styles.headerAvatar}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 20,
              }}
            >
              {user?.username || "Unknown"}
            </Text>
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 12,
              }}
            >
              {user?.email || "abc@gmail.com"}
            </Text>
          </View>
        </View>
        <TouchableHighlight
          onPress={() => {
            Vibration.vibrate(100, false);
            navigation.replace("Login");
          }}
          underlayColor="#eee"
          style={styles.powerBtn}
        >
          <Ionicons name="power-sharp" size={20} color="teal" />
        </TouchableHighlight>
      </View>
      <ScrollView>
        <View style={styles.navigationList}>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => navigation.navigate("Home")}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="home-outline" size={20} />
              <Text style={styles.name}>Home</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => navigation.navigate("MyDoctors")}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="medkit-outline" size={20} />
              <Text style={styles.name}>My Doctors</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => navigation.navigate("PrivacyPolicy")}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="shield-checkmark-outline" size={20} />
              <Text style={styles.name}>Privacy Policy</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => navigation.navigate("BookedAppointments")}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="calendar-outline" size={20} />
              <Text style={styles.name}>My Appointments</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => navigation.navigate("SearchDoc")}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="search-outline" size={20} />
              <Text style={styles.name}>Search Doctors</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => navigation.navigate("ViewHospital")}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="business-outline" size={20} />
              <Text style={styles.name}>View Hospitals</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => navigation.navigate("Blog", user)}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="reader-outline" size={20} />
              <Text style={styles.name}>Read Blogs</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => navigation.navigate("Calculator")}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="calculator-outline" size={20} />
              <Text style={styles.name}>Calculator</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => {
              Share.share({
                message: "This is the message which is to be shared ",
                url: "https://www.geeksforgeeks.com",
                title: "Share with your friends",
              });
            }}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <Ionicons name="person-add-outline" size={20} />
              <Text style={styles.name}>Tell a friend</Text>
            </View>
          </TouchableHighlight>
          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                marginLeft: 14,
                marginBottom: 10,
                fontSize: 16,
              }}
            >
              Communities
            </Text>
            <TouchableHighlight
              underlayColor={"#eee"}
              onPress={() => navigation.navigate("WebView")}
              style={styles.touchableBtn}
            >
              <View style={styles.btn}>
                <FontAwesome name="youtube" size={20} />
                <Text style={styles.name}>Youtube</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={"#eee"}
              onPress={() => navigation.navigate("WebView")}
              style={styles.touchableBtn}
            >
              <View style={styles.btn}>
                <FontAwesome name="instagram" size={20} />
                <Text style={styles.name}>Instagram</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={"#eee"}
              onPress={() => navigation.navigate("WebView")}
              style={styles.touchableBtn}
            >
              <View style={styles.btn}>
                <Feather name="twitter" size={20} />
                <Text style={styles.name}>Twitter</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.logout}>
          <TouchableHighlight
            underlayColor={"#eee"}
            onPress={() => {
              setVisible(!visible);
            }}
            style={styles.touchableBtn}
          >
            <View style={styles.btn}>
              <FontAwesome name="trash-o" color={"red"} size={20} />
              <Text style={[styles.name, { color: "red" }]}>
                Delete Account?
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Modal
        visible={visible}
        animationType="fade"
        onDismiss={() => setVisible(false)}
        transparent={true}
        statusBarTranslucent={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000070",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 300,
              height: 200,
              backgroundColor: "#fff",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="trash-o" size={30} />
            <Text
              style={{
                fontFamily: "MontserratMedium",
                textAlign: "center",
                width: 230,
                marginTop: 5,
              }}
            >
              Are you sure you want to delete your account?{" "}
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                textAlign: "center",
                width: 230,
                marginTop: 5,
                fontSize: 10,
              }}
            >
              You will loss all prescriptions and appointment history by
              deleting your account.
            </Text>
            <View
              style={{
                width: 240,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <TouchableHighlight
                onPress={() => setVisible(!visible)}
                underlayColor="#eee"
                style={[styles.btns, { backgroundColor: "#eee" }]}
              >
                <Text style={{ fontFamily: "MontserratMedium", fontSize: 13 }}>
                  Cancel
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={deleteAccount}
                style={[styles.btns, { backgroundColor: "red" }]}
              >
                <Text
                  style={{
                    fontFamily: "MontserratMedium",
                    fontSize: 13,
                    color: "#fff",
                  }}
                >
                  Yes, Delete
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  drawer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  btns: {
    width: 105,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  header: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 12,
  },
  touchableBtn: {
    width: "100%",
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
  navigationList: {
    height: "auto",
    // backgroundColor: "red",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  logout: {
    height: 60,
    justifyContent: "center",
    // backgroundColor: "gold",
  },
  name: {
    fontSize: 15,
    // fontWeight: "600",
    marginLeft: 12,
    fontFamily: "MontserratMedium",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default CustomDrawer;
