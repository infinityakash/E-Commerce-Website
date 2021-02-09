import Axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    //   Fetching data from backend
    const { data } = await Axios.get('/api/products'); //sending an ajax request
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data }); //type of this action is success and then payload is set to data
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};