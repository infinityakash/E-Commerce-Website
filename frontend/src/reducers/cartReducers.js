import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_EMPTY, CART_ADD_ITEM_FAIL,} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // Check if the above item already exists
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state, // not changing other properties
          error: '', // Force Item buy(54)
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else { // Product is new and does not exist in cart item
        return {
          // ...state, cartItems: [...state.cartItems, item] // Concatenates the items 
          ...state, error: '', cartItems: [...state.cartItems, item] // Force Item buy(54)
          
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),  // Filtering items in action.payload
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_ADD_ITEM_FAIL:
        return { ...state, error: action.payload };
    case CART_EMPTY:
      return { ...state, error: '', cartItems: [] };
    default:
      return state;
  }
};