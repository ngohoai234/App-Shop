import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actToggleCart, actToggleFav } from "./../store/actions";
import Loading from "./Loading";
const DetailScreen = (props) => {
  const products = useSelector((state) => state.products);
  const favourites = useSelector((state) => state.favourites);
  const data = products.find((product) => product.id === props.route.params.id);
  let isFav = favourites.find((product) => product.id === data.id);
  const loadingFav = useSelector((state) => state.loadingFav);
  const loadingCart = useSelector((state) => state.loadingCart);

  const [color, setColor] = useState(isFav);
  const dispatch = useDispatch();

  const handlePressFav = (data) => {
    dispatch(actToggleFav(data));
    setColor(!color);
  };
  const handleAddCart = (product) => {
    dispatch(actToggleCart(product));
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            handlePressFav(data);
          }}
        >
          <Ionicons name="ios-star" size={40} color={color ? "red" : "black"} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, color]);
  if (loadingFav || loadingCart) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <View style={styles.main}>
        <Image source={{ uri: data.image }} style={styles.fitImage} />
        <View style={styles.infoBox}>
          <Text>Product </Text>
          <Text style={styles.propText}>{data.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Price</Text>
          <Text style={styles.propText}>{data.price}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Ram</Text>
          <Text style={styles.propText}>{data.ram}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Size</Text>
          <Text style={styles.propText}>{data.size}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Description</Text>
          <Text style={{ marginLeft: 10, paddingLeft: 5 }}>
            {data.description}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              width: "40%",
              backgroundColor: "#FF543C",
              borderRadius: 3,
              marginTop: 20,

              marginBottom: 20,
            }}
            onPress={() => {
              handleAddCart(data);
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  rating: {
    marginTop: 10,
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    shadowColor: "orange",
    shadowOpacity: 0.8,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    elevation: 2,
  },
  fitImage: {
    borderRadius: 5,
    zIndex: -1,
    resizeMode: "contain",
    width: "100%",
    height: 430,
    shadowColor: "gray",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  defaultText: {
    fontSize: 15,
  },
  propText: {
    fontSize: 15,
  },
  descText: {
    width: `95%`,
  },
});

export default DetailScreen;
