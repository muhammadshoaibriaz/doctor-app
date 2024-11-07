import { View, Text } from "react-native";
import React from "react";
import { IP_ADDRESS } from "../../../db/IP";

export default function AllArticles() {
  const Messages = async () => {
    try {
      await fetch(`${IP_ADDRESS}/api/messages`)
        .then((res) => res.json())
        .then((res) => console.log(res));
    } catch (err) {}
  };
  return (
    <View>
      <Text>AllArticles</Text>
    </View>
  );
}
