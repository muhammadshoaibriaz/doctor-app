import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";

import ArticleCard from "./ArticleCard";
import BigArticleCard from "./BigArticleCard";
import axios from "axios";
import { IP_ADDRESS } from "../../db/IP";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { FONT, style } from "../../Theme";
import { Image } from "react-native";

export default function Blogs({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  const user = route?.params;
  // console.log("Params are", user);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getArticles();
    getBlogs();
  }, []);

  const getArticles = async () => {
    const response = await axios.get(`${IP_ADDRESS}/api/doc/get_article`);
    if (response) {
      setArticles(response.data);
      setFilteredArticles(response.data);
    } else {
      console.log("Failed to fetch articles");
    }
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/api/doc/get_blogs`);
      setBlogs(response.data);
      // console.log(response.data);
      setFilteredBlogs(response.data);
    } catch (error) {
      console.log("Error getting articles", error.message);
    }
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

  const handleSearch = (text) => {
    setSearch(text);
    if (search === "") {
      setFilteredArticles(articles);
      setFilteredBlogs(blogs);
    } else {
      const filteredArticles = articles.filter((article) => {
        return article.title.toLowerCase().includes(search.toLowerCase());
      });
      const filteredBlogs = blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredBlogs(filteredBlogs);
      setFilteredArticles(filteredArticles);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
    getArticles();
    getBlogs();
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={[style.header, { backgroundColor: "#f9f9f9" }]}>
        <TouchableOpacity
          style={style.headerBackBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} />
        </TouchableOpacity>
        <Text style={style.header_text}>Read Blogs</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search here..."
          value={search}
          onChangeText={handleSearch}
          style={styles.input}
        />
        <AntDesign name="search1" size={16} />
      </View>

      {filteredArticles.length < 1 && filteredBlogs.length < 1 ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            paddingBottom: 120,
          }}
        >
          <Image
            source={require("../../assets/images/spinner.gif")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
          />
          <Text style={{ fontFamily: "MontserratMedium" }}>loading...</Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 18,
              marginLeft: 14,
              marginBottom: 10,
            }}
          >
            Recent articles
          </Text>
          <FlatList
            data={filteredArticles}
            horizontal
            contentContainerStyle={{ paddingLeft: 14 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              // console.log("object", item);
              return (
                <ArticleCard
                  image={{ uri: item?.bannerImage }}
                  description={item?.description}
                  likes={item?.likes}
                  onPress={() => {
                    navigation.navigate("ViewArticle", { item, params });
                    handleViews(item?._id);
                  }}
                  publish_date={item?.posting_date}
                  title={item?.title}
                  views={item?.views}
                />
              );
            }}
          />
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 18,
              marginLeft: 14,
              marginTop: 14,
              marginBottom: 6,
            }}
          >
            Blogs
          </Text>
          <FlatList
            data={filteredBlogs}
            horizontal
            contentContainerStyle={{ paddingLeft: 14 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              // console.log("Filtered blogs ", item);
              return (
                <BigArticleCard
                  image={{ uri: item?.url }}
                  description={item?.description}
                  likes={item?.likes}
                  onPress={() => {
                    navigation.navigate("ViewArticle", { item, params });
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
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 14,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderRadius: 30,
    height: 40,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "MontserratMedium",
  },
});
