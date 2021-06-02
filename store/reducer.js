import PRODUCTS from "./../data/products";
import {
  ADD_CART,
  INCREASE_AMOUNT,
  GET_PRODUCTS,
  GET_FAVOURITES,
  DELETE_FAVOURITE,
  ADD_FAVOURITE,
  GET_CARTS,
  DELETE_CART,
  DECREASE_AMOUNT,
} from "./constants";
const initialState = {
  products: [],
  filterProducts: PRODUCTS,
  carts: [],
  favourites: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CART: {
      let carts = [...state.carts, payload];
      return { ...state, carts };
    }
    case GET_CARTS: {
      let carts = [...payload];
      return { ...state, carts };
    }
    case DELETE_CART: {
      let carts = [...state.carts].filter(
        (product) => product.id !== payload.id
      );
      return { ...state, carts };
    }
    case INCREASE_AMOUNT: {
      // payload : object product
      let carts = [...state.carts].filter(
        (product) => product.id !== payload.id
      );
      carts = [...carts, payload];
      return { ...state, carts };
    }
    case DECREASE_AMOUNT: {
      // payload : object product
      let carts = [...state.carts].filter(
        (product) => product.id !== payload.id
      );
      carts = [...carts, payload];
      return { ...state, carts };
    }
    case GET_PRODUCTS: {
      return { ...state, products: payload };
    }
    case GET_FAVOURITES: {
      let favourites = [...payload];
      return { ...state, favourites };
    }
    case DELETE_FAVOURITE: {
      let favourites = [...state.favourites].filter(
        (product) => product.id !== payload
      );
      return { ...state, favourites };
    }
    case ADD_FAVOURITE: {
      let product = { ...payload, isFav: true };
      let favourites = [...state.favourites, product];
      return { ...state, favourites };
    }

    default:
      return state;
  }
};
