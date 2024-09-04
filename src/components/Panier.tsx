'use client'
import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Panier = () => {
  const { state, dispatch } = useCart();

  const router = useRouter();
  const cartAction = async () => {
    fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: localStorage.getItem('cart')
    })
    .then(response => {
      console.log(response)

      // Log the cookies from the response
      const cookies = response.headers.get('set-cookie');
      console.log('Cookies received from HelloAsso API:', cookies);
  
      // If you need to set these cookies manually in the document
      if (cookies) {
          cookies.split(',').forEach(cookie => {
              document.cookie = cookie; // Set each cookie in the document
          });
      }
  
      router.push('https://www.helloasso.com/associations/rotary-club-chateaubriant/evenements/puces-de-bere/2');
     }) 
    .catch(error => console.error('Error:', error)); // Handle errors
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const validateCart = async () => {
    await cartAction();
    console.log('Cart validated');
  };

  const formatPrice = (price: number) => {
    return Math.round(price).toString();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 min-w-2xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Votre Panier</h2>
      {state.items.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex-grow">
                <h3 className="font-semibold">{item.id === 'Table' ? 'Table' : `Emplacement ${item.id}`}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-4">{formatPrice(item.price * item.quantity / 100)}€</span>
                  <div className="flex items-center">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleQuantityChange(item.id, Math.min(1, item.quantity + 1))}
                    >
                      <Plus size={16} />
                    </button>                    
                    {item.id !== 'Table' ? (
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >                    
                        <Trash2 size={18} />
                      </button>
                    ):(<></>)}
                  </div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Vider
            </button>
            <div className="text-xl font-bold">
              TOTAL: {formatPrice(state.items.reduce((total, item) => total + (item.price * item.quantity / 100), 0))}€
            </div>
          </div>
          <button
            onClick={validateCart}
            className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={20} className="mr-2" />
            Valider le panier
          </button>
        </>
      )}
    </div>
  );
};

export default Panier;