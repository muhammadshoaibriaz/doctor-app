import {
  View,
  Text,
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

export default function InputBar({
  onPress,
  style,
  comment,
  onChangeText,
  onFocus,
  wrapperStyle,
  inputStyle,
  placeholder,
}) {
  return (
    <Animated.View style={[wrapperStyle, styles.comment_input]}>
      <TextInput
        value={comment}
        onChangeText={onChangeText}
        multiline
        onFocus={onFocus}
        style={[inputStyle, styles.input]}
        placeholder={placeholder}
      />
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <LinearGradient
          style={styles.sendBtn}
          start={{ x: 0.5, y: 0.4 }}
          colors={["#02bcbc", "teal"]}
        >
          <FontAwesome
            style={{ position: "absolute", marginLeft: 8 }}
            name="send-o"
            size={16}
            color={"#fff"}
          />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "MontserratRegular",
  },
  title: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
  },
  smallText: {
    fontFamily: "MontserratMedium",
    fontSize: 10,
  },
  bigTitle: {
    fontFamily: "MontserratMedium",
    fontSize: 30,
    color: "#fff",
  },
  comment_input: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  input: {
    flex: 0.98,
    borderRadius: 50,
    backgroundColor: "#f9f9f9",
    paddingLeft: 12,
    height: 40,
    fontFamily: "MontserratRegular",
    paddingVertical: 8,
    marginRight: 3,
  },
  sendBtn: {
    width: 35,
    height: 35,
    borderRadius: 30,
    alignContent: "center",
    justifyContent: "center",
  },
});
