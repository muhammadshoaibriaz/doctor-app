import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
  Animated,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import {
  AntDesign,
  Feather,
  Entypo,
  EvilIcons,
  Fontisto,
  Foundation,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import BottomSheet from "react-native-raw-bottom-sheet";

import { IP_ADDRESS } from "../../db/IP";
import { Keyboard, StatusBar } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ToastAndroid } from "react-native";
import InputBar from "../../doctor/components/userprofile/custom/InputBar";
const { width, height } = Dimensions.get("screen");
export default function ViewArticle({ route }) {
  const { item } = route.params;
  const { params } = route;
  // console.log("objects", params);
  const navigation = useNavigation();
  const [liked, setLiked] = useState(item?.likes);
  // const [blogLiked, setBlogLiked] = useState(item?.likes);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [focused, setFocused] = useState(false);
  const postId = item?._id;

  const dateTime = new Date();
  const postedTime = dateTime.toTimeString();

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${IP_ADDRESS}/api/doc/article/${postId}`
      );
      setLiked(response.data.likes);
      // console.log(response.data.likes);
    } catch (error) {
      console.log("Error liking article ", error.message);
    }
  };

  const handleLikeBlog = async () => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/api/doc/blog/${postId}`);
      // console.log(response.data);
      setLiked(response.data.likes);
    } catch (error) {
      console.log("Error liking post ", error.message);
    }
  };

  const bottomRef = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setFocused(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setFocused(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const writeComment = async () => {
    try {
      if (!comment.trim()) {
        ToastAndroid.show("Please enter something!", ToastAndroid.LONG);
      } else {
        const response = await axios.post(`${IP_ADDRESS}/api/comments`, {
          comment: comment,
          authorImg: params?.params?.avatar,
          postId,
          authorName: params?.params?.username,
          date: postedTime,
        });
        setComment("");
        console.log("Your comment was posted!");
      }
    } catch (error) {
      console.log("Cannot write comments", error.message);
    }
  };

  BackHandler.addEventListener("hardwareBackPress", () => {
    Keyboard.dismiss;
    setTranslate(!translate);
  });

  useEffect(() => {
    getCommentsByPostId();
  }, []);

  const getCommentsByPostId = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/api/comments/${postId}`);
      setComments(response.data);
      // console.log("post comments are ", response.data);
    } catch (err) {
      console.log("Error getting post comments");
    }
  };
  const [translate, setTranslate] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    Animated.spring(translateY, {
      toValue: translate ? -195 : 0,
      speed: 3,
      useNativeDriver: true,
    }).start();
    setTranslate(!translate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profile}
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={24} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={{ uri: item?.user_img }} style={styles.image} />
            <View style={{ marginLeft: 6 }}>
              <Text style={styles.title}>{item?.writer}</Text>
              <Text style={styles.smallText}>
                {item?.reading_duration} min read
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.other}>
          <TouchableOpacity
            style={styles.touchableBtn}
            onPress={() => {
              Share.share({
                message: `${item?.title}`,
                title: `${item.description}`,
                url: `${item.description}`,
              });
            }}
          >
            <AntDesign name="sharealt" size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableBtn}>
            <Ionicons name="bookmark-outline" size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: item?.url || item?.bannerImage }}
          style={[styles.bannerImage]}
        />
        <LinearGradient
          start={{ x: 0.5, y: 0.4 }}
          style={[
            styles.bannerImage,
            { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
          ]}
          colors={["transparent", "#f7f7f7"]}
        ></LinearGradient>
        <View style={styles.contentContainer}>
          <Text
            // onLayout={(e) => console.log(e.nativeEvent.layout.height)}
            style={[styles.bigTitle]}
            numberOfLines={2}
          >
            {item?.title}
          </Text>
          <Text
            style={[
              styles.text,
              { marginTop: item?.title.length < 20 ? 60 : 30 },
            ]}
          >
            {item?.description}
          </Text>
          {/* Comment section */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={styles.commentBtn}
              onPress={() => {
                handleLikeBlog() || handleLike();
              }}
            >
              <Ionicons name="heart" size={24} />
              <Text style={styles.smallText}>{item?.likes} Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commentBtn}
              onPress={() => {
                bottomRef.current.open();
              }}
            >
              <Ionicons name="chatbubble-ellipses" size={24} />
              <Text style={styles.smallText}>
                {comments.length < 1 ? " Comment " : +" " + comments.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentBtn}>
              <FontAwesome name="share" size={20} />
              <Text style={styles.smallText}>Share</Text>
            </TouchableOpacity>
          </View>
          <BottomSheet
            ref={bottomRef}
            keyboardAvoidingViewEnabled={true}
            animationType="fade"
            closeOnPressMask={true}
            closeOnDragDown={false}
            height={600}
            customStyles={{
              container: {
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                overflow: "hidden",
              },
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss;
              }}
              keyboardVerticalOffset={80}
            >
              {comments?.length > 0 ? (
                <>
                  <FlatList
                    data={comments}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={{ marginTop: 20, paddingHorizontal: 14 }}
                          key={index}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                            }}
                          >
                            <Image
                              source={{ uri: item?.authorImg }}
                              style={styles.authorImg}
                            />
                            <View style={styles.messageBox}>
                              <Text
                                style={{
                                  fontFamily: "MontserratMedium",
                                  fontSize: 15,
                                  color: "#555",
                                }}
                              >
                                {item?.comment}
                              </Text>
                              <Text style={styles.date}>
                                {item?.date?.slice(0, 5)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  ></FlatList>
                  <InputBar
                    comment={comment}
                    placeholder={`Comment as ${params?.params?.username}`}
                    onChangeText={(text) => setComment(text)}
                    onPress={() => {
                      writeComment();
                      getCommentsByPostId();
                    }}
                    style={{
                      height: comment?.length > 30 ? "auto" : 40,
                      borderRadius: comment?.length > 30 ? 20 : 40,
                      backgroundColor: "red",
                    }}
                    inputStyle={{
                      height: comment?.length > 30 ? "auto" : 40,
                      borderRadius: comment?.length > 30 ? 20 : 40,
                      backgroundColor: "red",
                    }}
                  />
                </>
              ) : (
                <View
                  style={{
                    width,
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Ionicons
                      name="chatbubble-ellipses"
                      size={44}
                      color="#ddd"
                    />
                    <Text
                      style={[
                        styles.bigTitle,
                        { color: "#999", fontSize: 16, marginTop: 8 },
                      ]}
                    >
                      No comments yet!
                    </Text>
                  </View>
                  <InputBar
                    onPress={() => {
                      writeComment();
                      getCommentsByPostId();
                    }}
                    comment={comment}
                    placeholder={`Comment as ${params?.params?.username}`}
                    wrapperStyle={{
                      position: "absolute",
                      bottom: 0,
                    }}
                    onChangeText={(text) => setComment(text)}
                  />
                </View>
              )}
            </TouchableWithoutFeedback>
          </BottomSheet>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 14,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 30,
  },
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
  other: {
    flexDirection: "row",
    alignItems: "center",
    width: 90,
    justifyContent: "space-between",
  },
  touchableBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    width: "100%",
    height: width / 1.3,
  },
  contentContainer: {
    top: -width / 4.5,
    paddingHorizontal: 14,
  },
  thumbLike: {
    position: "absolute",
    bottom: 70,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
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
    fontFamily: "MontserratRegular",
    paddingVertical: 8,
  },
  sendBtn: {
    width: 35,
    height: 35,
    borderRadius: 30,
    alignContent: "center",
    justifyContent: "center",
  },
  commentBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  date: {
    fontFamily: "MontserratRegular",
    fontSize: 8,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  messageBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 10,
    flex: 1,
  },
  authorImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f9f9f9",
  },
});
