import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import api from "./../api/api";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Loading from "./Loading";

const HomeScreen = (props) => {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleDrawer}>
          <Ionicons name="ios-menu" size={40} />
        </TouchableOpacity>
      ),
    });
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await api.get(`/categories`);
      setCategories([...response.data]);
    };
    fetchApi();
  }, []);
  useEffect(() => {}, [categories]);
  const handleDrawer = () => {
    navigation.openDrawer();
  };

  const handleNavigation = function (item) {
    navigation.navigate("ProductScreen", { categoryId: item.id });
  };
  const renderItemFlat = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          handleNavigation(item);
        }}
      >
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 90, height: 90 }}
          />
        </View>
        <Text style={styles.text} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  if (!categories && !categories.length) {
    return <Loading />;
  }
  return (
    <View style={styles.main}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItemFlat}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f5f5f0",
  },
  item: {
    flex: 1,
    height: 200,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "gray",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    margin: 5,
  },
  text: {
    fontSize: 18,
    alignContent: "flex-end",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default HomeScreen;
