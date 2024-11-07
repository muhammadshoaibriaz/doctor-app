import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width / 2.6;
const ITEM_HEIGHT = ITEM_WIDTH * 1.6;

export default function ArticleCard({
  title,
  description,
  image,
  publish_date,
  likes,
  views,
  onPress,
}) {
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <TouchableOpacity style={styles.likeBtn} onPress={() => setLiked(!liked)}>
        <Ionicons
          name="heart-outline"
          color={liked ? "teal" : "#fff"}
          size={20}
        />
      </TouchableOpacity>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.name}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.specialist}>
          {description}
        </Text>
        <View style={styles.bottom_area}>
          <View style={styles.description}>
            <Ionicons name="eye-outline" color={"#999"} />
            <Text
              style={{
                fontSize: 8,
                fontFamily: "MontserratMedium",
                color: "#999",
                marginLeft: 2,
              }}
            >
              {views}
            </Text>
          </View>
          <Text style={styles.views}>{publish_date.slice(0, 10)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: "auto",
    flexDirection: "column",
    marginRight: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 5,
  },
  details: {
    paddingHorizontal: 5,
    paddingTop: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: "MontserratMedium",
    marginBottom: 4,
  },
  specialist: {
    fontSize: 12,
    fontFamily: "MontserratMedium",
    opacity: 0.4,
  },

  description: {
    fontSize: 12,
    color: "#999",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "MontserratMedium",
  },
  views: {
    fontSize: 8,
    fontFamily: "MontserratMedium",
    color: "#999",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    alignSelf: "center",
    backgroundColor: "#eee",
    height: 120,
    borderRadius: 10,
  },
  bottom_area: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  likeBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 11,
  },
});
