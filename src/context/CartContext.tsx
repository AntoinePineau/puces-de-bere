'use client' 
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export type CartItem = {
  id: string;
  tierId: number;
  description: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

interface CartAction {
  type: string;
  item?: CartItem;
  id?: string;
  quantity?: number;
  items?: CartItem[];
}
const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (action.item) {
        return {
          items: [...state.items, action.item],
        };
      }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity ?? 1 } : item
        ),
      };
    case 'INIT_CART':
      return {
        items: action.items ?? [],
      };
    case 'CLEAR_CART':
      return {
        items: [],
      };
    default:
      return state;
  }
}

interface CartProviderProps {
  children: ReactNode;
}
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        var cart = JSON.parse(storedCart);
        if(cart.filter((i:CartItem)=>i.id==='Table').length===0) {
          cart.push({id:'Table',tierId:12703282,description:'1m20 x 60cm', price:100, quantity:0});
        }
        dispatch({ type: 'INIT_CART', items: cart });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
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
