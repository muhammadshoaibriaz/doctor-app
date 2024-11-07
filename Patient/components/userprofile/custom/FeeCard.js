import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function FeeCard({
  title,
  fees,
  onPress,
  iconName,
  icon,
  startTime,
  endTime,
  timingIcon,
  style,
  available,
}) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={icon} size={14} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
      >
        <Ionicons name={timingIcon} size={14} />
        <Text style={styles.title}>
          {startTime} - {endTime}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Text
          style={[
            styles.title,
            { color: "teal", fontFamily: "MontserratMedium" },
          ]}
        >
          {available}
        </Text>
        <Text style={[styles.title, { color: "teal" }]}>Rs: {fees}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "MontserratRegular",
    fontSize: 13,
    marginLeft: 4,
  },
  card: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#00808016",
    width: 200,
    marginRight: 8,
  },
});
