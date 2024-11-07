import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { IP_ADDRESS } from "../../../../db/IP";

export default function Card({
  name,
  image,
  time,
  day,
  age,
  accept,
  reject,
  disease,
  status,
  onPress,
  done,
}) {
  return (
    <TouchableOpacity
      style={styles.doctorCard}
      activeOpacity={1}
      onPress={onPress}
    >
      <Image source={image} style={[styles.image, { flex: 0.2 }]} />
      <View style={{ marginLeft: 10, flex: 0.8 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={[styles.details, { flex: 1 }]} numberOfLines={1}>
          Age: {age}+ | Disease: {disease}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.timeSlot}>
            <Text style={{ color: "teal" }}>{day}</Text> {time}
          </Text>
          {status === "pending" ? (
            <View style={styles.statusBtn}>
              <TouchableOpacity style={styles.status} onPress={reject}>
                <Text style={[styles.text, { color: "red" }]}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.status} onPress={accept}>
                <Text style={styles.text}>
                  {status === "pending" ? "Accept" : "Accepted"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : status === "accepted" ? (
            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 2 }}
            >
              <View style={styles.status}>
                <Text
                  style={[
                    styles.text,
                    { color: "teal", textTransform: "capitalize" },
                  ]}
                >
                  {status}
                </Text>
              </View>
              <TouchableOpacity style={styles.status} onPress={done}>
                <Text
                  style={[
                    styles.text,
                    { color: "tomato", textTransform: "capitalize" },
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.status}>
              <Text style={[styles.text, { color: "red" }]}>{status}</Text>
            </View>
          )}
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
    flex: 1,
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
    margin: 2,
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
  text: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
    color: "teal",
    bottom: 1,
    marginLeft: 3,
  },
  timeSlot: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
    marginTop: 4,
  },
  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
});
