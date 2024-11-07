import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";

export default function PastCard({ name, description, image, time, status }) {
  return (
    <View style={styles.doctorCard}>
      <Image source={image} style={[styles.image, { flex: 0.2 }]} />
      <View style={{ marginLeft: 10, flex: 0.8 }}>
        <Text style={styles.name}>{name}</Text>
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
            {time}
          </Text>
          <View
            style={[
              styles.status,
              {
                borderColor:
                  status === "Done"
                    ? "green"
                    : status === "Missed"
                    ? "orange"
                    : status === "Cancelled"
                    ? "red"
                    : "transparent",
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 12,
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
