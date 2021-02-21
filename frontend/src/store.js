import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  productDetailsReducer,
  productListReducer,
  productCreateReducer,
  productUpdateReducer, 
  productDeleteReducer,
  
} from './reducers/productReducers';
import { userSigninReducer,
         userRegisterReducer,
         userDetailsReducer,
         userUpdateProfileReducer, 
         userListReducer,
         userDeleteReducer,
         userUpdateReducer,
         userTopSellerListReducer,
        } 
         from './reducers/userReducers';
import { orderCreateReducer,
         orderDetailsReducer,
         orderPayReducer,
         // For Order History 
         orderMineListReducer,
        // List Order(42)
         orderListReducer,
         orderDeleteReducer,
         orderDeliverReducer,
         } from './reducers/orderReducers';

// const initialState = {};
// const reducer = (state,action) => {
//     return {products:data.products};
// };
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],

    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer, // Signin
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer, // Order History
  userDetails: userDetailsReducer, // User Profile
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userTopSellersList: userTopSellerListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;