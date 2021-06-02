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
  FAILURE_DATA,
  SUCCESS_DATA,
  BEGIN_FETCH,
  GET_CATOGORIES,
  BEGIN_FETCHFAV,
  FAILURE_FAV,
  SUCCESS_FAV,
  BEGIN_CARTS,
  FAILURE_CARTS,
  SUCCESS_CATS,
} from "./constants";
const initialState = {
  products: [],
  carts: [],
  favourites: [],
  loading: true,
  error: null,
  loadingFav: true,
  errorFav: null,
  loadingCart: true,
  errorCart: null,
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
    // loading products
    case SUCCESS_DATA: {
      return { ...state, loading: false };
    }
    case FAILURE_DATA: {
      return { ...state, loading: false, error: payload };
    }
    case BEGIN_FETCH: {
      return { ...state, loading: true };
    }
    // loading Fav
    case SUCCESS_FAV: {
      return { ...state, loadingFav: false };
    }
    case FAILURE_FAV: {
      return { ...state, loadingFav: false, errorFav: payload };
    }
    case BEGIN_FETCHFAV: {
      return { ...state, loadingFav: true };
    }
    // carts
    case SUCCESS_CATS: {
      return { ...state, loadingCart: false };
    }
    case FAILURE_CARTS: {
      return { ...state, loadingCart: false, errorCart: payload };
    }
    case BEGIN_CARTS: {
      return { ...state, loadingCart: true };
    }

    default:
      return state;
  }
};
