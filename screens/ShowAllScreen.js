import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { actToggleCart, actToggleFav } from "../store/actions";
const ShowAllScreen = (props) => {
  const { navigation } = props;
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleDrawer = () => {
    navigation.openDrawer();
  };
  const handleNavigate = (url, item) => {
    navigation.navigate(url, { id: item.id });
  };
  const handleToggleFav = (item) => {
    dispatch(actToggleFav(item));
    Alert.alert("Tiêu đề", "Đã thêm vào giỏ hàng", [
      {
        text: "Ok",
        onPress: () => {
          console.log("OK ok");
        },
      },
    ]);
  };
  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleNavigate("DetailScreen", item);
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
            <Text style={{ color: "#666666" }}>Size :{item.size} </Text>
            <Text style={{ color: "#666666" }}>Ram :{item.ram} </Text>
            <Text style={styles.text_black}>Price : ${item.price}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPressIn={() => {
                  dispatch(actToggleCart(item));
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
                <Ionicons name="heart" size={50} color="#FF543C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={products}
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
export default ShowAllScreen;
