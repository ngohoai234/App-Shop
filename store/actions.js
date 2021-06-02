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
  SUCCESS_DATA,
  FAILURE_DATA,
  BEGIN_FETCH,
  BEGIN_FETCHFAV,
  FAILURE_FAV,
  SUCCESS_FAV,
  SUCCESS_CATS,
  FAILURE_CARTS,
  BEGIN_CARTS,
} from "./constants";

export const actGetProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(actBeginFetch());
      let { data } = await api.get(`/products`);
      dispatch({
        type: GET_PRODUCTS,
        payload: data,
      });
      dispatch(actSuccessData());
    } catch (error) {
      dispatch(actFailureData(error));
    }
  };
};

export const actAddCart = (product) => {
  return async (dispatch) => {
    try {
      dispatch(actBeginCarts());
      await api.post(`/carts`, { ...product });
      dispatch({
        type: ADD_CART,
        payload: product,
      });
      dispatch(actSuccessCarts());
    } catch (error) {
      dispatch(actFailureCarts(error));
    }
  };
};

export const actGetCarts = () => {
  return async (dispatch) => {
    await dispatch(actBeginCarts());
    try {
      let { data } = await api.get(`/carts`);
      await dispatch({
        type: GET_CARTS,
        payload: data,
      });
      await dispatch(actSuccessCarts());
    } catch (err) {
      await dispatch(actFailureCarts(err));
    }
  };
};

export const actDeleteCart = (product) => {
  return async (dispatch) => {
    dispatch(actBeginCarts());
    try {
      await api.delete(`/carts/${product.id}`);
      dispatch({
        type: DELETE_CART,
        payload: product,
      });
      dispatch(actSuccessCarts());
    } catch (error) {
      dispatch(actFailureCarts(error));
    }
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
    dispatch(actBeginCarts());
    try {
      let { amount } = product;
      amount += 1;
      await api.put(`/carts/${product.id}`, { ...product, amount });
      dispatch({ type: INCREASE_AMOUNT, payload: { ...product, amount } });
      dispatch(actSuccessCarts());
    } catch (error) {
      dispatch(actFailureCarts(error));
    }
  };
};

export const actDecreaseAmount = (product) => {
  return async (dispatch) => {
    dispatch(actBeginCarts());
    try {
      let { amount } = product;
      amount -= 1;
      await api.put(`/carts/${product.id}`, { ...product, amount });
      dispatch({ type: INCREASE_AMOUNT, payload: { ...product, amount } });
      dispatch(actSuccessCarts());
    } catch (error) {
      dispatch(actFailureCarts(error));
    }
  };
};
// favourites
// action 1 : get favourties

export const actGetFavourites = () => {
  return async (dispatch) => {
    await dispatch(actBeginFav());
    try {
      let { data } = await api.get(`/favourites`);
      await dispatch({
        type: GET_FAVOURITES,
        payload: data,
      });
      await dispatch(actSuccessFav());
    } catch (err) {
      dispatch(actFailureFav(err));
    }
  };
};
// action 2 :  delete object trong favourites
export const actDeleteFavourite = (product) => {
  return async (dispatch) => {
    dispatch(actBeginFav());
    try {
      await Promise.all([api.delete(`/favourites/${product.id}`)]);
      dispatch(actSuccessFav());
      dispatch({
        type: DELETE_FAVOURITE,
        payload: product.id,
      });
    } catch (error) {
      dispatch(actFailureFav(err));
    }
  };
};
// add favourtie

export const actAddFavourite = (product) => {
  return async (dispatch) => {
    dispatch(actBeginFav());
    try {
      await api.post(`/favourites`, { ...product, isFav: true });
      dispatch({
        type: ADD_FAVOURITE,
        payload: product,
      });
      dispatch(actSuccessFav());
    } catch (error) {
      dispatch(actFailureFav(err));
    }
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
// products
export const actSuccessData = () => {
  return (dispatch) => {
    dispatch({
      type: SUCCESS_DATA,
    });
  };
};
export const actFailureData = (err) => {
  return (dispatch) => {
    dispatch({
      type: FAILURE_DATA,
      payload: err,
    });
  };
};

export const actBeginFetch = () => {
  return (dispatch) => {
    dispatch({
      type: BEGIN_FETCH,
    });
  };
};

// loading favourties
export const actSuccessFav = () => {
  return (dispatch) => {
    dispatch({
      type: SUCCESS_FAV,
    });
  };
};
export const actFailureFav = (err) => {
  return (dispatch) => {
    dispatch({
      type: FAILURE_FAV,
      payload: err,
    });
  };
};

export const actBeginFav = () => {
  return (dispatch) => {
    dispatch({
      type: BEGIN_FETCHFAV,
    });
  };
};

// loading carts
export const actSuccessCarts = () => {
  return (dispatch) => {
    dispatch({
      type: SUCCESS_CATS,
    });
  };
};
export const actFailureCarts = (err) => {
  return (dispatch) => {
    dispatch({
      type: FAILURE_CARTS,
      payload: err,
    });
  };
};

export const actBeginCarts = () => {
  return (dispatch) => {
    dispatch({
      type: BEGIN_CARTS,
    });
  };
};
