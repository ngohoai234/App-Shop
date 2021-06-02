import api from "../api/api";
import {
  ADD_CART,
  INCREASE_AMOUNT,
  GET_PRODUCTS,
  DELETE_FAVOURITE,
  ADD_FAVOURITE,
  GET_CARTS,
  DELETE_CART,
  DECREASE_AMOUNT,
  GET_FAVOURITES,
} from "./constants";

export const actGetProducts = () => {
  return async (dispatch) => {
    let { data } = await api.get(`/products`);
    dispatch({
      type: GET_PRODUCTS,
      payload: data,
    });
  };
};

export const actAddCart = (product) => {
  return async (dispatch) => {
    await api.post(`/carts`, { ...product });
    dispatch({
      type: ADD_CART,
      payload: product,
    });
  };
};

export const actGetCarts = () => {
  return async (dispatch) => {
    let { data } = await api.get(`/carts`);
    dispatch({
      type: GET_CARTS,
      payload: data,
    });
  };
};

export const actDeleteCart = (product) => {
  return async (dispatch) => {
    await api.delete(`/carts/${product.id}`);
    dispatch({
      type: DELETE_CART,
      payload: product,
    });
  };
};

export const actToggleCart = (product) => {
  return async (dispatch) => {
    const { data } = await api.get("/carts");
    let index = data.findIndex((item) => {
      return item.id === product.id;
    });
    if (index >= 0) {
      dispatch(actDeleteCart(product));
    } else {
      dispatch(actAddCart({ ...product, amount: 1 }));
    }
  };
};

export const actIncreaseAmount = (product) => {
  return async (dispatch) => {
    let { amount } = product;
    amount += 1;
    await api.put(`/carts/${product.id}`, { ...product, amount });
    dispatch({ type: INCREASE_AMOUNT, payload: { ...product, amount } });
  };
};

export const actDecreaseAmount = (product) => {
  return async (dispatch) => {
    let { amount } = product;
    if (amount >= 1) {
      amount -= 1;
      await api.put(`/carts/${product.id}`, { ...product, amount });
      dispatch({ type: DECREASE_AMOUNT, payload: { ...product, amount } });
    }
  };
};
// favourites
// action 1 : get favourties

export const actGetFavourites = () => {
  return async (dispatch) => {
    let { data } = await api.get(`/favourites`);
    dispatch({
      type: GET_FAVOURITES,
      payload: data,
    });
  };
};
// action 2 :  delete object trong favourites
export const actDeleteFavourite = (product) => {
  return async (dispatch) => {
    await Promise.all([api.delete(`/favourites/${product.id}`)]);
    dispatch({
      type: DELETE_FAVOURITE,
      payload: product.id,
    });
  };
};
// add favourtie

export const actAddFavourite = (product) => {
  return async (dispatch) => {
    await api.post(`/favourites`, { ...product, isFav: true });
    dispatch({
      type: ADD_FAVOURITE,
      payload: product,
    });
  };
};

export const actToggleFav = (product) => {
  return async (dispatch) => {
    const { data } = await api.get("/favourites");
    let index = data.findIndex((item) => {
      return item.id === product.id;
    });
    // trường hợp đã có trong mảng thì xóa
    if (index >= 0) {
      dispatch(actDeleteFavourite(product));
    } else {
      dispatch(actAddFavourite(product));
    }
  };
};
