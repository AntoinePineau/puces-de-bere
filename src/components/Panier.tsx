'use client'
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CartItem } from '../context/CartContext';

const Panier = () => {
  const router = useRouter();
  const { state, dispatch } = useCart();  
  const [isPro, setIsPro] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
      ri: '',
      ci: null as File | null,
      cp: null as File | null,
      rule: false,
  });
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const sendEmail = async (formData: any, emplacements:string) => {
    // Ajoutez les informations de l'email
    const emailData = {
      to: formData.email, // Utilisez l'email du formulaire
      subject: 'Confirmation de votre inscription',
      text: `Bonjour ${formData.firstName},\n\nMerci pour votre inscription. Voici les détails :\n\nNom: ${formData.lastName}\nEmail: ${formData.email}\nTéléphone: ${formData.tel}\n${emplacements}\n\nCordialement,\nL'équipe des Puces de Béré`,
      attachments: [] as { filename: string; content: string }[]
    };

    if (formData.ci) {
      const ciBase64 = await fileToBase64(formData.ci);
      emailData.attachments.push({
        filename: formData.ci.name,
        content: ciBase64.split(',')[1]  // Retire le prefixe data MIME
      });
    }

    if (formData.cp) {
      const cpBase64 = await fileToBase64(formData.cp);
      emailData.attachments.push({
        filename: formData.cp.name,
        content: cpBase64.split(',')[1]
      });
    }

    // Créer un objet FormData
    /*const formDataToSend = new FormData();
    formDataToSend.append('to', emailData.to);
    formDataToSend.append('subject', emailData.subject);
    formDataToSend.append('text', emailData.text);

    // Ajouter les fichiers si disponibles
    if (formData.ci) {
        formDataToSend.append('attachments', formData.ci); // Ajoutez la copie de la carte d'identité
    }
    if (formData.cp) {
        formDataToSend.append('attachments', formData.cp); // Ajoutez la copie de la carte professionnelle
    }*/

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData) 
      });
      if (!response.ok) throw new Error("Email sending failed");
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      alert("Erreur lors de l'envoi de l'email.");
    }
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsPro(event.target.value === 'oui' ? true : event.target.value === 'non' ? false : null);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = event.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
      }));
  };
  const validateForm = (event: React.FormEvent) => {
      const { firstName, lastName, email, tel, ri, ci, cp, rule } = formData;
      // Vérification des champs obligatoires
      if (!firstName) {
          alert("Veuillez remplir votre prénom");
          return false;
      }
      const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
      if (!firstNameInput.checkValidity()) {
          alert("Veuillez ne pas insérer de caractères spéciaux dans votre prénom");
          return false;
      }
      if (!lastName) {
          alert("Veuillez remplir votre nom de famille");
          return false;
      }
      const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
      if (!lastNameInput.checkValidity()) {
          alert("Veuillez ne pas insérer de caractères spéciaux dans votre nom de famille");
          return false;
      }
      if (!email) {
          alert("Veuillez remplir votre adresse e-mail");
          return false;
      }
      const emailInput = document.getElementById('email') as HTMLInputElement;
      if (!emailInput.checkValidity()) {
          alert("Veuillez entrer une adresse e-mail valide");
          return false;
      }
      if (!tel) {
          alert("Veuillez remplir votre numéro de téléphone");
          return false;
      }
      const telInput = document.getElementById('tel') as HTMLInputElement;
      if (!telInput.checkValidity()) {
          alert("Veuillez entrer un numéro de téléphone valide");
          return false;
      }
      if (!ri) {
          alert("Veuillez valider le règlement intérieur");
          return false;
      }
      if (isPro==null) {
          alert("Veuillez indiquer si vous êtes un particulier ou un professionnel");
          return false;
      }
      if (isPro) {
          if (!cp) {
              alert("Veuillez fournir la copie de votre carte professionnelle.");
              return false;
          }
      } else {
        if (!ci) {
            alert("Veuillez fournir la copie de votre carte d'identité");
            return false;
        }
        if (!rule) {
            alert("Veuillez certifier sur l'honneur.");
            return false;
        }
      }
      return true;
  };
  const cartAction = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm(event)) return;
    const { firstName, lastName, email, tel, ri, ci, cp, rule } = formData;

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
      if(tableCount>0) itemName += " | ";
      itemName += "Emplacements: " + otherItems.join(", "); // Add other item IDs
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
      "backUrl": `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      "errorUrl": `${process.env.NEXT_PUBLIC_BASE_URL}/erreur/`,
      "returnUrl": `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation/`
    };
    fetch('/api/order', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutBody)
    })
    .then(response => response.json())
    .then(async response => {
      console.log("response from /api/order:", response);
      if(response.redirectUrl) {
        const emailSent = await sendEmail(formData, itemName);

        if (emailSent) {  // Redirection seulement si l'email est envoyé avec succès
          router.push(response.redirectUrl);
        } else {
            alert("L'email n'a pas pu être envoyé. Veuillez vérifier vos informations.");
        }
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

  const validateCart = async (event: React.FormEvent) => {
    await cartAction(event);
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
                      onClick={() => handleQuantityChange(item.id, item.id==='Table' ? item.quantity + 1 : Math.min(1, item.quantity + 1))}
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
                    ):(<span className="ml-4"><Trash2 size={18} color='white'/></span>)}
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
          <form onSubmit={validateCart}>
            <div className="mt-4">
              <label htmlFor="firstName" className="block">Prénom</label>
              <input type="text" name="firstName" id="firstName" className="border rounded p-2 w-full" placeholder="Entrez votre prénom" onChange={handleChange} required pattern="^[A-Za-zÀ-ÿ]+$" />
            </div>
            <div className="mt-4">
              <label htmlFor="lastName" className="block">NOM</label>
              <input type="text" name="lastName" id="lastName" className="border rounded p-2 w-full" placeholder="Entrez votre nom de famille" onChange={handleChange} required pattern="^[A-Za-zÀ-ÿ]+$" />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block">E-mail</label>
              <input type="email" name="email" id="email" className="border rounded p-2 w-full" placeholder="Entrez votre adresse e-mail" onChange={handleChange} required />
            </div>
            <div className="mt-4">
              <label htmlFor="tel" className="block">Téléphone</label>
              <input type="tel" name="tel" id="tel" className="border rounded p-2 w-full" placeholder="Entrez votre numero de téléphone" onChange={handleChange} required pattern="^(0[1-9]([-. ]?[0-9]{2}){4}|(\+33|0)[1-9]([-. ]?[0-9]{2}){4})$"/>
            </div>
            <div className="mt-4">
              <input type="checkbox" name="ri" id="ri" className="border rounded p-2" onChange={handleChange} required />&nbsp;
              <label htmlFor="ri">Je valide le <a href="/reglement-interieur/" target="_blank">règlement intérieur</a></label>
            </div>
            <div className="mt-4">
              <div>Êtes-vous un professionnel ?</div>
              <input type="radio" name="pro" id="prooui" className="border rounded p-2" value="oui" onChange={handleRadioChange}/>&nbsp;<label htmlFor="prooui">Oui</label>
              <br/>
              <input type="radio" name="pro" id="pronon" className="border rounded p-2" value="non" onChange={handleRadioChange}/>&nbsp;<label htmlFor="pronon">Non</label>
            </div>
            <div className={`particulier ${isPro === false ? '' : 'hidden'}`}>
              <div className="mt-4">
                <label htmlFor="ci" className="block">Veuillez fournir la copie de votre carte d&apos;identité (formats: .pdf, .jpg, .jpeg, .png)</label>
                <input type="file" name="ci" id="ci" className="border rounded p-2 w-full" accept=".pdf,.jpg,.jpeg,.png" required
                onChange={(e) => setFormData({ ...formData, ci: e.target.files ? e.target.files[0] : null })}/>
              </div>
              <div className="mt-4">
                <input type="checkbox" name="rule" id="rule" className="border rounded p-2" onChange={handleChange} required />&nbsp;
                <label htmlFor="rule">Je certifie sur l&apos;honneur, en tant que particulier, non inscrit à aucun registre du commerce ou des métiers, avoir pris connaissance de la réglementation me permettant de participer aux ventes au déballage, pour vendre uniquement des objets personnels et usagés, deux fois par an au plus (art. L310 alinéa 2 du code du commerce). Je connais les risques encourus en cas de fausse déclaration (art. R321 du code pénal)</label>
              </div>
            </div>
            <div className={`professionnel ${isPro === true ? '' : 'hidden'}`}>
              <div className="mt-4">
                <label htmlFor="cp" className="block">Veuillez fournir la copie de votre carte professionnelle (formats: .pdf, .jpg, .jpeg, .png)</label>
                <input type="file" name="cp" id="cp" className="border rounded p-2 w-full" accept=".pdf,.jpg,.jpeg,.png" required
                onChange={(e) => setFormData({ ...formData, cp: e.target.files ? e.target.files[0] : null })}/>
              </div>
            </div>
          </form>
          <button
            onClick={validateCart}
            className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={20} className="mr-2" />
            Valider et passer au paiement
          </button>
        </>
      )}
    </div>
  );
};

export default Panier;