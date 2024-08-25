// /src/context/CartContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

type CartItem = {
  id: string;
  description: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'INIT_CART'; items: CartItem[] }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        items: [...state.items, action.item],
      };
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };
    case 'INIT_CART':
      return {
        items: action.items,
      };
    case 'CLEAR_CART':
      return {
        items: [],
      };
    default:
      return state;
  }
}

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'INIT_CART', items: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
