import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import * as MailComposer from "expo-mail-composer";

export default function Help() {
  const navigation = useNavigation();
  const [mail, setMail] = useState(""); // Email body
  const sendEmail = async () => {
    try {
      await MailComposer.composeAsync({
        recipients: ["shoaibriaze@gmail.com"],
        subject: "Test Email",
        body: mail,
      });
      setMail("");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 14 }}>
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
            marginRight: 15,
          }}
        >
          Help
        </Text>
        <Text style={{}}></Text>
      </View>
      <TextInput
        placeholder="Type your message..."
        multiline={true}
        allowFontScaling
        style={styles.input}
        autoCorrect
        onChangeText={(text) => setMail(text)}
        clearButtonMode="while-editing"
      />
      <Text style={{ fontFamily: "MontserratRegular", marginTop: 6 }}>
        Fill out the form above to send an email and one of our team members
        will address your question as soon as possible.
      </Text>
      <TouchableHighlight style={styles.continue} onPress={sendEmail}>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "MontserratMedium",
          }}
        >
          Send Now
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderRadius: 6,
    fontFamily: "MontserratRegular",
    textAlignVertical: "top",
    height: 180,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 8,
    borderRadius: 8,
  },
  continue: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    alignSelf: "center",
    backgroundColor: "teal",
    borderRadius: 6,
    bottom: 20,
    position: "absolute",
  },
});
