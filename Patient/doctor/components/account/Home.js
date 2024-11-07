import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ArticleCard from "../userprofile/custom/ArticleCard";

import React, { useEffect, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import BigArticleCard from "../userprofile/custom/BigArticleCard";
import axios from "axios";
import { IP_ADDRESS } from "../../../db/IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as Animatable from "react-native-animatable";

export default function Home({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  // console.log("home page params is", params.docUser);
  const user = params?.docUser;

  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getArticles();
    getBlogs();
  }, []);

  const getArticles = async () => {
    const response = await axios.get(`${IP_ADDRESS}/api/doc/get_article`);
    if (response) {
      setArticles(response.data);
      console.log(response.data);
    } else {
      console.log("Failed to fetch articles");
    }
  };

  const getBlogs = async () => {
    const response = await axios.get(`${IP_ADDRESS}/api/doc/get_blogs`);
    if (response) {
      setBlogs(response.data);
      // console.log(response.data);
    } else {
      console.log("Failed to fetch blogs");
    }
  };

  // Prevent going back to the previous screen
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
    return unsubscribe;
  }, [navigation]);

  // close the app when the hardware back button pressed
  const handleBackButtonPress = () => {
    Alert.alert("HotDoc!", "Do you want to exit the app?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Yes",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
  };

  // remove the listener when the back button is pressed so it doesn't keep firing
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      );

      return () => subscription.remove();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefreshed = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 4000);
    getArticles();
    getBlogs();
  };

  const handleViews = async (postId) => {
    try {
      const response = await axios.put(
        `${IP_ADDRESS}/api/doc/article/${postId}`
      );
      getArticles();
      console.log("views of the post are ", response.data.views);
    } catch (error) {
      console.log("Error in viewing post", error.message);
    }
  };
  const handleBlogViews = async (postId) => {
    try {
      const response = await axios.put(`${IP_ADDRESS}/api/doc/blog/${postId}`);
      getBlogs();
      console.log("views of the post are ", response.data.views);
    } catch (error) {
      console.log("Error in viewing post", error.message);
    }
  };

  return (
    <SafeAreaView>
      <Animated.View style={[styles.header]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text
            onPress={async () => {
              await AsyncStorage.removeItem("username");
            }}
            style={styles.title}
          >
            HotDoc
          </Text>
        </View>
        <TouchableHighlight
          style={{ borderRadius: 50, paddingHorizontal: 5, paddingVertical: 3 }}
          underlayColor={"#eee"}
          onPress={() => navigation.navigate("Login")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: user?.image }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                // marginRight: 4,
              }}
            />
            {/* <FontAwesome name="sign-out" size={18} color="teal" /> */}
          </View>
        </TouchableHighlight>
      </Animated.View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefreshed()}
          />
        }
      >
        {articles.length < 1 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              height: Dimensions.get("screen").height - 100,
            }}
          >
            <Image
              source={require("../../assets/images/spinner.gif")}
              style={{ width: 100, height: 100 }}
            />
            <Animatable.Text
              animation={"fadeIn"}
              iterationCount={"infinite"}
              iterationDelay={1000}
              isInteraction={true}
              style={{ fontFamily: "MontserratMedium" }}
            >
              Loading...
            </Animatable.Text>
          </View>
        ) : (
          <View>
            <View style={styles.articles}>
              <TouchableOpacity
                style={styles.flexBtn}
                onPress={() => navigation.navigate("PublishArticle")}
              >
                <Text style={styles.smallTitle}>Articles</Text>
                <AntDesign size={20} name="plus" color={"teal"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flexBtn}
                onPress={() => navigation.navigate("AllArticles")}
              >
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={articles}
              horizontal
              contentContainerStyle={{ paddingLeft: 14 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <ArticleCard
                    image={{ uri: item?.bannerImage }}
                    description={item?.description}
                    likes={item?.likes}
                    onPress={() => {
                      handleViews(item?._id);
                      navigation.navigate("ViewArticle", { item, user });
                    }}
                    publish_date={item?.posting_date}
                    title={item?.title}
                    views={item?.views}
                  />
                );
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("PublishBlog")}
              style={[
                styles.flexBtn,
                { marginTop: 20, marginBottom: 10, marginLeft: 14 },
              ]}
            >
              <Text style={styles.smallTitle}>Blogs</Text>
              <AntDesign size={20} name="plus" color={"teal"} />
            </TouchableOpacity>

            <FlatList
              data={blogs}
              horizontal
              contentContainerStyle={{ paddingLeft: 14 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <BigArticleCard
                    image={{ uri: item?.url }}
                    description={item?.description}
                    likes={item?.likes}
                    onPress={() => {
                      navigation.navigate("ViewArticle", { item, user });
                      handleBlogViews(item?._id);
                    }}
                    publish_date={item?.posting_date}
                    title={item?.title}
                    views={item?.views}
                  />
                );
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 4,
    justifyContent: "space-between",
  },
  articles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 14,
  },
  flexBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "MontserratBold",
  },

  smallTitle: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
  },
  seeAll: {
    fontFamily: "MontserratMedium",
  },
});
