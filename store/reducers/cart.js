import {ADD_TO_CART, DELETE_FROM_CART} from '../actions/cart';
import CartItem from '../../model/cart-item';
import {add} from 'react-native-reanimated';
import {ADD_ORDER} from '../actions/orders';
import {DELETE_PRODUCT} from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productTitle = addedProduct.title;
      const productPrice = addedProduct.price;

      let updateOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updateOrNewCartItem = new CartItem(
          productTitle,
          productPrice,
          state.items[addedProduct.id].quantity + 1,
          state.items[addedProduct.id].sum + productPrice,
        );
      } else {
        updateOrNewCartItem = new CartItem(
          productTitle,
          productPrice,
          1,
          productPrice, // sum
        );
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updateOrNewCartItem,
        },
        totalAmount: state.totalAmount + productPrice,
      };
    case DELETE_FROM_CART:
      const productId = state.items[action.product.productId];
      const productQuantity = productId.quantity;
      console.log('quantity' + productQuantity);
      let updatedCartItems;
      if (productQuantity > 1) {
        // reduce the quantity by 1
        const updatedItem = new CartItem(
          productId.title,
          productId.price,
          productId.quantity - 1,
          productId.sum - productId.price,
        );
        updatedCartItems = {
          ...state.items,
          [action.product.productId]: updatedItem,
        };
      } else {
        // delete the item
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.product.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - productId.price,
      };

    case ADD_ORDER: {
      return initialState;
    }

    case DELETE_PRODUCT: {
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    }
  }
  return state;
};
