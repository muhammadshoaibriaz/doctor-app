import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";

export default function Card({
  name,
  description,
  image,
  time,
  status,
  day,
  onLongPress,
  reviews,
}) {
  return (
    <TouchableOpacity style={styles.doctorCard} onLongPress={onLongPress}>
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
            {time} <Text style={{ color: "teal" }}>{day}</Text>
          </Text>
          <View
            style={[
              styles.status,
              {
                borderColor:
                  status === "done"
                    ? "green"
                    : status === "rejected"
                    ? "orange"
                    : status === "pending"
                    ? "teal"
                    : status === "accepted"
                    ? "lightblue"
                    : "transparent",
              },
            ]}
          >
            <View
              style={[
                styles.dot,
                {
                  borderColor:
                    status === "done"
                      ? "green"
                      : status === "rejected"
                      ? "orange"
                      : status === "pending"
                      ? "teal"
                      : "transparent",
                  backgroundColor:
                    status === "done"
                      ? "green"
                      : status === "rejected"
                      ? "orange"
                      : status === "pending"
                      ? "teal"
                      : status === "accepted"
                      ? "lightblue"
                      : "transparent",
                },
              ]}
            ></View>
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 12,
                color: "teal",
                bottom: 1,
                marginLeft: 3,
                color:
                  status === "done"
                    ? "green"
                    : status === "rejected"
                    ? "orange"
                    : status === "pending"
                    ? "teal"
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
    </TouchableOpacity>
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
    height: 90,
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
    borderColor: "#eee",
    color: "teal",
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: "teal",
    borderWidth: 1,
    borderColor: "#48dada",
    shadowColor: "teal",
    elevation: 30,
  },
});
