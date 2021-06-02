import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import DetailScreen from "../screens/DetailScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FilterScreen from "../screens/FilterScreen";
import CartScreen from "../screens/CartScreen";
import ShowAllScreen from "../screens/ShowAllScreen";
import {
  actGetCarts,
  actGetFavourites,
  actGetProducts,
} from "./../store/actions";
import { useSelector, useDispatch } from "react-redux";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const mainStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home Screen",
          headerTitleStyle: { alignSelf: "center" },
        }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          title: "Products Screen",
          headerTitleStyle: { alignSelf: "center" },
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: "Detail Screen",
          headerTitleStyle: { alignSelf: "center" },
        }}
      />
    </Stack.Navigator>
  );
};
const favStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{
          title: "Favourite Screen",
          headerTitleStyle: { alignSelf: "center" },
        }}
      />
    </Stack.Navigator>
  );
};
const Cart = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CartScreen"
      component={CartScreen}
      options={{
        title: "Cart Screen",
        headerTitleStyle: { alignSelf: "center" },
      }}
    />
  </Stack.Navigator>
);
const mainTab = () => {
  let favourties = useSelector((state) => state.favourites);
  let carts = useSelector((state) => state.carts);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Favourite") {
            iconName = "ios-list";
          } else if (route.name === "ShoppingCart") {
            iconName = focused ? "ios-cart" : "ios-cart-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={mainStack} />
      <Tab.Screen
        name="Favourite"
        component={favStack}
        options={{ tabBarBadge: favourties.length ? favourties.length : 0 }}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={Cart}
        options={{ tabBarBadge: carts.length ? carts.length : 0 }}
      />
    </Tab.Navigator>
  );
};
const filter = () => (
  <Stack.Navigator>
    <Stack.Screen name="FilterScreen" component={FilterScreen} />
  </Stack.Navigator>
);
const showAll = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ShowAllScreen"
      component={ShowAllScreen}
      options={{
        title: "Show All Screen",
        headerTitleStyle: { alignSelf: "center" },
      }}
    />
  </Stack.Navigator>
);
const Navigations = () => {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(actGetFavourites());
        await dispatch(actGetCarts());
      } catch (error) {}
    };

    fetchApi();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={mainTab} tag="hi" />
        <Drawer.Screen name="Filter" component={filter} />
        <Drawer.Screen name="Show All" component={showAll} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
