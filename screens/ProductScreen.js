import React, { useEffect, useState } from "react";
import api from "./../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { actToggleCart, actToggleFav } from "../store/actions";
import { Ionicons } from "@expo/vector-icons";
const ProductScreen = (props) => {
  const { navigation } = props;

  const products = useSelector((state) => state.products).filter(
    (product) => product.categoryId === props.route.params.categoryId
  );

  const dispatch = useDispatch();
  const handleAddCart = async (product) => {
    dispatch(actToggleCart({ ...product, amount: 1 }));
  };
  const handlePress = (item) => {
    navigation.navigate("DetailScreen", { id: item.id });
  };
  const handleToggleFav = async (item) => {
    dispatch(actToggleFav(item));
  };
  const handleRenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handlePress(item);
        }}
      >
        <View style={styles.item}>
          <View style={{ width: "35%", height: 200, flex: 1 }}>
            <Image
              style={{
                width: "100%",
                height: "95%",
                resizeMode: "contain",
                borderRadius: 5,
              }}
              source={{ uri: item.image }}
            />
          </View>
          <View
            style={{
              justifyContent: "space-around",
              alignContent: "center",
              marginLeft: 20,
              flex: 2,
            }}
          >
            <View style={{ overFlow: "hidden" }}>
              <Text numberOfLines={1} style={styles.text_black}>
                {item.name}
              </Text>
            </View>
            <Text style={{ color: "#666666" }}>Category : </Text>
            <Text style={styles.text_black}>Price : {item.price}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPressIn={() => {
                  handleAddCart(item);
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  width: 135,
                  backgroundColor: "white",
                  borderRadius: 3,
                  borderColor: "#FF543C",
                  borderWidth: 1,
                }}
                onPress={() => {}}
              >
                <Text
                  style={{
                    color: "#FF543C",
                    fontWeight: "bold",
                  }}
                >
                  Add to Cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  handleToggleFav(item);
                }}
              >
                <Ionicons name="heart" size={50} color={"#FF543C"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!products.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={products}
        renderItem={handleRenderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  image: {
    borderRadius: 5,
    zIndex: -1,
    width: `40%`,
    height: 300,
    resizeMode: "contain",
  },
  infoBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 15,
  },
  text_black: {
    color: "black",
    fontWeight: "bold",
  },
});

export default ProductScreen;
