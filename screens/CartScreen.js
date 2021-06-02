import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  actDeleteCart,
  actIncreaseAmount,
  actDecreaseAmount,
} from "../store/actions";
import api from "../api/api";
const CartScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.carts);
  const handleDrawer = () => {
    navigation.openDrawer();
  };
  const handleAddAmount = (product) => {
    dispatch(actIncreaseAmount(product));
  };
  const handleDecreaseAmount = (product) => {
    dispatch(actDecreaseAmount(product));
  };
  const handleAddCart = async (product) => {
    dispatch(actDeleteCart(product));
  };
  const renderList = ({ item }) => {
    return (
      <View>
        <View style={styles.item}>
          <View style={{ width: "35%", height: 130 }}>
            <Image
              style={{
                width: "100%",
                height: "85%",
                resizeMode: "contain",
                borderRadius: 5,
                marginTop: "auto",
                marginBottom: "auto",
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
            <Text style={styles.text_black}>Price : {item.price}</Text>
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
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 15,
                  paddingRight: 15,
                  width: 15,
                  backgroundColor: "white",
                  borderRadius: 3,
                  borderColor: "#FF543C",
                  borderWidth: 1,
                }}
                onPress={() => {
                  handleDecreaseAmount(item);
                }}
              >
                <Text
                  style={{
                    color: "#FF543C",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <View style={{ marginLeft: 15, marginRight: 15 }}>
                {/* phải lấy được sản phẩm */}
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 20,
                  }}
                >
                  {item.amount}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 15,
                  paddingRight: 15,
                  width: 15,
                  backgroundColor: "white",
                  borderRadius: 3,
                  borderColor: "#FF543C",
                  borderWidth: 1,
                }}
                onPress={() => {
                  handleAddAmount(item);
                }}
              >
                <Text style={{ color: "#FF543C", fontWeight: "bold" }}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleAddCart(item);
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
                <Ionicons
                  name="ios-trash-bin-sharp"
                  size={30}
                  color="#FF543C"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
        data={data}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={renderList}
      />
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          width: "90%",
          backgroundColor: "#FF543C",
          borderRadius: 3,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 20,
        }}
        onPress={() => {
          Alert.alert("Đặt hàng", "Nhấn xác nút xác nhận để đặt hàng", [
            {
              text: "Xác nhận",
              onPress: () => {
                console.log("Aka");
              },
            },
          ]);
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Order Now
        </Text>
      </TouchableOpacity>
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
    alignItems: "center",
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

export default CartScreen;
