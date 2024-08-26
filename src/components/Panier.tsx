// /src/components/Panier.tsx
'use client'
import React from 'react';
import { useCart } from '../context/CartContext';

const Panier = () => {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (id:string, quantity:number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const handleRemove = (id:string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  return (
    <div>
      <h2>Votre Panier</h2>
      {state.items.map((item) => (
        <div key={item.id}>
          <h3>{item.id==='table' ? item.id : 'Emplacement '+item.id}</h3>
          <p>{item.description}</p>
          <p>{item.price/100} €</p>
          {item.id!=='table'&& 
          <>
            <input
              type="number"
              value={item.quantity}
              min={0}
              max={1}
              onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
            />
            <button onClick={() => handleRemove(item.id)}>Supprimer</button>
          </>
          }
          {item.id==='table'&& 
          <>
            <input
              type="number"
              value={item.quantity}
              min={0}
              onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
            />
          </>
          }
        </div>
      ))}
    </div>
  );
};

export default Panier;
