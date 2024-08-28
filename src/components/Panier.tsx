import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Panier = () => {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Votre Panier</h2>
      {state.items.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex-grow">
                <h3 className="font-semibold">{item.id === 'table' ? 'Table' : `Emplacement ${item.id}`}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-4">{(item.price * item.quantity / 100).toFixed(2)} €</span>
                {item.id !== 'table' ? (
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
                  </div>
                ) : (
                  <input
                    type="number"
                    value={item.quantity}
                    min={0}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className="w-16 text-center border rounded p-1"
                  />
                )}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Vider le panier
            </button>
            <div className="text-xl font-bold">
              TOTAL: {state.items.reduce((total, item) => total + (item.price * item.quantity / 100), 0).toFixed(2)} €
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Panier;