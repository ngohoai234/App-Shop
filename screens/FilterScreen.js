import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { actToggleCart, actToggleFav } from "../store/actions";

const FilterScreen = (props) => {
  const { navigation } = props;
  let data = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([...data]);
  const [isSale, setIsSale] = useState(false);
  const [isBrand, setIsBrand] = useState(false);
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
            <Text style={styles.text_black}>Price : {item.price}</Text>
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
    // vừa  brand vừa sale
    // item.isBrand === isBrand &&  item.isSale === isSale
    //   brand hoac sale
    // item.isBrand === isBrand ||  item.isSale === isSale

    setProducts([
      ...data.filter(
        (item) => item.isBrand === isBrand && item.isSale === isSale
      ),
    ]);
  }, [isBrand, isSale]);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleDrawer}>
          <Ionicons name="ios-menu" size={40} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <View>
            <Ionicons name="ios-save" size={40} />
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text style={[styles.text_black, { textAlign: "center", fontSize: 25 }]}>
        Chọn bộ lọc
      </Text>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 50,
          },
        ]}
      >
        <View style={styles.view}>
          <Text style={styles.text}>Hàng mới</Text>
          <Switch
            style={styles.Switch}
            value={isBrand}
            onValueChange={(newState) => setIsBrand(newState)}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Khuyến mãi</Text>
          <Switch
            style={styles.Switch}
            value={isSale}
            onValueChange={(newState) => setIsSale(newState)}
          />
        </View>
      </View>
      {/* end Switch */}
      <FlatList
        keyExtractor={(item) => item.id.toString()}
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
export default FilterScreen;
