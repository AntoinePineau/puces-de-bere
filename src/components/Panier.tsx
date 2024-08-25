// /src/components/Panier.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Panier = () => {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  return (
    <div>
      {state.items.map((item) => (
        <div key={item.id}>
          <h2>{item.id}</h2>
          <p>{item.description}</p>
          <p>{item.price} €</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
          />
          <button onClick={() => handleRemove(item.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default Panier;
