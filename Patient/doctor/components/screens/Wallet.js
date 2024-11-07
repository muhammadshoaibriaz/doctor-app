import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { IP_ADDRESS } from "../../../db/IP";
import { Dialog } from "react-native-elements";

export default function Wallet({ route }) {
  const { params } = route;
  const [visible, setVisible] = useState(false);
  const user = params?.docUser;
  // console.log(user?._id);
  const fetchData = async () => {
    const response = await axios.put(
      `${IP_ADDRESS}/api/doc/sign_up/${user?._id}`
    );
    // console.log("response", response.data);
  };
  fetchData();
  return (
    <SafeAreaView style={{ paddingHorizontal: 14, paddingTop: 12 }}>
      <Text style={styles.title}>Wallet</Text>
      <View style={styles.balanceBar}>
        <View>
          <Text style={styles.text}>Available balance</Text>
          <Text style={styles.balance}>$ 0.00</Text>
        </View>
        <TouchableOpacity
          style={styles.paymentBtn}
          onPress={() => setVisible(!visible)}
        >
          <Text
            style={[
              styles.text,
              { color: "#fff", fontFamily: "MontserratMedium" },
            ]}
          >
            Pay Out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.balanceBar}>
        <Text style={[styles.text]}>Transaction history</Text>
        <TouchableOpacity
          style={[styles.paymentBtn, { backgroundColor: "transparent" }]}
          onPress={() => setVisible(!visible)}
        >
          <Text
            style={[
              styles.text,
              { fontFamily: "MontserratMedium", fontSize: 13, color: "teal" },
            ]}
          >
            Add money +
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.transaction}>
        <Image
          source={require("../../assets/images/i_info.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "MontserratMedium",
            marginVertical: 6,
          }}
        >
          No transaction history!
        </Text>
        <Text
          style={{
            fontFamily: "MontserratRegular",
            textAlign: "center",
            color: "#999",
          }}
        >
          Once you successfully complete some requests. Your transaction will
          appear here!
        </Text>
      </View>
      <Dialog
        visible={visible}
        animationType="fade"
        statusBarTranslucent={true}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{ padding: 20, width: 330 }}
      >
        <View style={styles.modalWrapper}>
          <Text style={styles.title}>Payout</Text>
          <View style={[styles.balanceBar, { marginTop: 10 }]}>
            <View>
              <Text style={styles.text}>Available balance</Text>
              <Text style={styles.balance}>$ 0.00</Text>
            </View>
            <TouchableOpacity style={styles.paymentBtn}>
              <Text
                style={[
                  styles.text,
                  { color: "#fff", fontFamily: "MontserratMedium" },
                ]}
              >
                Pay Out
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput placeholder="Account no" style={styles.input} />
          <TextInput placeholder="Bank account no" style={styles.input} />
        </View>
      </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "MontserratMedium",
    fontSize: 20,
  },
  balanceBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    fontFamily: "MontserratRegular",
  },
  balance: {
    fontSize: 20,
    fontFamily: "MontserratMedium",
    marginTop: 5,
  },
  paymentBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: "teal",
  },
  transaction: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapper: {
    width: "100%",
    borderRadius: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderRadius: 6,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});
