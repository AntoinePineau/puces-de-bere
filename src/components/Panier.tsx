'use client'
import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CartItem } from '../context/CartContext';

const Panier = () => {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const cartAction = async () => {
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;

    // Check if any of the fields are empty
    if (!firstName || !lastName || !email) {
        alert("Tous les champs sont obligatoires."); // Alert if any field is empty
        return; // Stop further execution
    }
    var cart = JSON.parse(localStorage.getItem('cart') ?? '[]') as CartItem[];
    var itemName = "Inscription en tant qu'exposant aux Puces de Béré 2025 - ";
    var tableCount = 0;
    var otherItems: string[] = [];
    var price = 0;

    // Use forEach to iterate through the cart
    cart.forEach(function(item) {
      price += item.price*item.quantity;
      if (item.id === "Table") {
        tableCount += item.quantity; // Count the quantity of tables
      } else {
        otherItems.push(item.id); // Collect other item IDs
      }
    });

    // Concatenate the results
    if (tableCount > 0) {
      itemName += `${tableCount} Table`+(tableCount>1?'s':''); // Add table count
    }
    if (otherItems.length > 0) {
      itemName += " | Emplacements: " + otherItems.join(", "); // Add other item IDs
    }

    const checkoutBody = {
      "containsDonation": false,
      "payer": {
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      },
      "items": cart.map(item => ({
        tiersId: item.tierId, // Use tierId from the new cart structure
        quantity: item.quantity
      })),
      "totalAmount": price,
      "initialAmount": price,
      "itemName": itemName,
      "backUrl": "https://puces-de-bere.vercel.app/",
      "errorUrl": "https://puces-de-bere.vercel.app/error/",
      "returnUrl": "https://puces-de-bere.vercel.app/confirmation/"
    };
    fetch('/api/order', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutBody)
    })
    .then(response => response.json())
    .then(response => {
      console.log("response from /api/order:", response);
      if(response.redirectUrl) {
        router.push(response.redirectUrl);
      }
      else {
        console.log('no redirectUrl is given');
      }
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
            <div id={""+item.tierId} key={item.id} className="flex items-center justify-between border-b py-4">
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
          <div>
            <div className="mt-4">
              <label htmlFor="firstName" className="block">Prénom <span className="text-red-500">*</span></label>
              <input type="text"  id="firstName" className="border rounded p-2 w-full" placeholder="Entrez votre prénom"/>
            </div>
            <div className="mt-4">
              <label htmlFor="lastName" className="block">NOM <span className="text-red-500">*</span></label>
              <input type="text" id="lastName" className="border rounded p-2 w-full" placeholder="Entrez votre nom de famille"/>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block">E-mail <span className="text-red-500">*</span></label>
              <input type="email" id="email" className="border rounded p-2 w-full" placeholder="Entrez votre adresse e-mail"/>
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