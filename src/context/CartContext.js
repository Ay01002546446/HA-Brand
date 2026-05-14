import React, { createContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      // Check if item with same ID, size, and color exists
      const existingItem = state.items.find(
        item =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === newItem.id &&
            item.size === newItem.size &&
            item.color === newItem.color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity: 1 }],
        };
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === action.payload.id && 
                    item.size === action.payload.size &&
                    item.color === action.payload.color)
        ),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
};

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return [...state, action.payload];
    case 'LOAD_ORDERS':
      return action.payload;
    case 'UPDATE_ORDER_STATUS':
      return state.map(order =>
        order.id === action.payload.id
          ? { ...order, status: action.payload.status }
          : order
      );
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initCart = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [] };
  };

  const initOrders = () => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  };

  const [cart, dispatchCart] = useReducer(cartReducer, { items: [] }, initCart);
  const [orders, dispatchOrder] = useReducer(orderReducer, [], initOrders);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    dispatchCart({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.title} added to cart!`);
  };

  const updateOrderStatus = (id, status) => {
    dispatchOrder({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } });
  };

  const removeFromCart = (id, size, color) => {
    dispatchCart({ type: 'REMOVE_FROM_CART', payload: { id, size, color } });
  };

  const updateQuantity = (id, quantity, size, color) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
    } else {
      dispatchCart({ type: 'UPDATE_QUANTITY', payload: { id, quantity, size, color } });
    }
  };

  const clearCart = () => {
    dispatchCart({ type: 'CLEAR_CART' });
  };

  const placeOrder = (order) => {
    dispatchOrder({ type: 'ADD_ORDER', payload: order });
    clearCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
        {children}
      </OrderContext.Provider>
    </CartContext.Provider>
  );
};

export { CartContext, OrderContext };