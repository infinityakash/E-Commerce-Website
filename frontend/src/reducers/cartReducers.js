import { CART_ADD_ITEM , CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // Check if the above item already exists
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state, // not changing other properties
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else { // Product is new and does not exist in cart item
        return {
          ...state, cartItems: [...state.cartItems, item] // Concatenates the items 
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),  // Filtering items in action.payload
      };
    case CART_SAVE_SHIPPING_ADDRESS:
        return { ...state, shippingAddress: action.payload };  
    default:
      return state;
  }
};