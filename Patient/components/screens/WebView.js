import { View, Text, StatusBar } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { tr } from "rn-emoji-keyboard";

export default function WebViews() {
  return (
    <WebView
      source={{ uri: "http://shoaibriaz.great-site.net/?i=1" }}
      style={{ flex: 1 }}
    />
  );
}
