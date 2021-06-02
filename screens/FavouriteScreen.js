import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { actDeleteFavourite, actToggleCart } from "../store/actions";
import Loading from "./Loading";

const FavouriteScreen = (props) => {
  const products = useSelector((state) => state.favourites);
  const loadingFav = useSelector((state) => state.loadingFav);
  const dispatch = useDispatch();
  const { navigation } = props;
  const handleNavigate = (item) => {
    const { id } = item;
    navigation.navigate("DetailScreen", {
      id,
    });
  };
  const handleDeleteFav = (product) => {
    dispatch(actDeleteFavourite(product));
  };
  const handleMoveToCart = (product) => {
    dispatch(actToggleCart(product));
    navigation.navigate("ShoppingCart");
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleNavigate(item);
        }}
      >
        <View style={styles.item}>
          <View style={{ width: "35%", height: 200 }}>
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
            }}
          >
            <View style={{ overFlow: "hidden" }}>
              <Text numberOfLines={1} style={styles.text_black}>
                {item.name}
              </Text>
            </View>
            <Text style={{ color: "#666666" }}>Category : </Text>
            <Text style={styles.text_black}>Price : ${item.price}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
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
                onPress={() => {
                  handleMoveToCart(item);
                }}
              >
                <Text style={{ color: "#FF543C", fontWeight: "bold" }}>
                  Move to Cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteFav(item);
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  width: 50,
                  backgroundColor: "white",
                  marginLeft: 10,
                }}
              >
                <Ionicons name="ios-trash-bin-sharp" size={40} color="orange" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const handleDrawer = () => {
    navigation.openDrawer();
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleDrawer}>
          <Ionicons name="ios-menu" size={40} />
        </TouchableOpacity>
      ),
    });
  }, []);
  if (loadingFav) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={renderList}
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

export default FavouriteScreen;
