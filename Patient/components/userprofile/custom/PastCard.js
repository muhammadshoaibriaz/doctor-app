import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";

export default function PastCard({
  name,
  description,
  day,
  image,
  time,
  status,
  verified,
}) {
  return (
    <View style={styles.doctorCard}>
      <Image source={image} style={[styles.image, { flex: 0.2 }]} />
      <View style={{ marginLeft: 10, flex: 0.8 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.name}>{name}</Text>
          {verified === "Approved" ? (
            <Image
              source={require("../../../assets/images/verified.png")}
              style={{
                width: 14,
                height: 14,
                marginLeft: 2,
                tintColor: "teal",
              }}
            />
          ) : (
            ""
          )}
        </View>
        <Text style={styles.details} numberOfLines={2}>
          {description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontFamily: "MontserratMedium",
              marginTop: 4,
            }}
          >
            {day} <Text style={{ color: "teal" }}>{time}</Text>
          </Text>
          <View
            style={[
              styles.status,
              {
                borderColor:
                  status === "done"
                    ? "green"
                    : status === "Missed"
                    ? "orange"
                    : status === "Cancelled"
                    ? "red"
                    : status === "accepted"
                    ? "lightblue"
                    : "transparent",
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 12,
                color:
                  status === "done"
                    ? "green"
                    : status === "Missed"
                    ? "orange"
                    : status === "rejected"
                    ? "red"
                    : status === "accepted"
                    ? "lightblue"
                    : "transparent",
              }}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  btn: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },

  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 10,
  },
  btnBox: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontFamily: "MontserratMedium",
  },
  details: {
    fontSize: 13,
    fontFamily: "MontserratRegular",
    opacity: 0.7,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 40,
    borderWidth: 1,
  },
});
