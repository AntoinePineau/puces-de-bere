import { Metadata } from 'next';
import React, { useState } from 'react';
'use client';

export const metadata: Metadata = {
  title: "Puces de Béré 2026 | Accueil",
  description: "Réservez vos places en ligne pour la journée du 18 janvier 2026"
};

export default function Home() {
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
  });
  const onSubmit = async (event: React.FormEvent) => {
    await validateForm(event);
    const emailSent = await sendEmail(formData);
    if (emailSent) {  
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
      });
      alert("Votre pré-inscription a été enregistrée avec succès !");
    } else {
        alert("L'email n'a pas pu être envoyé. Veuillez vérifier vos informations.");
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value.trim(),
    }));
  };
    
  const validateForm = (event: React.FormEvent) => {
    const { firstName, lastName, email, tel} = formData;
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
    return true;
  };
      
  const sendEmail = async (formData: any) => {
    // Ajoutez les informations de l'email
    const emailData = {
      to: formData.email, // Utilisez l'email du formulaire
      subject: `Pré-inscription pour les Puces de Béré 2026`,
      text: `Bonjour, voici une nouvelle pré-inscription.\n\nVoici les détails :\n\n- Nom: ${formData.lastName}\n- Prénom:  ${formData.firstName}\n- Email: ${formData.email}\n- Téléphone: ${formData.tel}\n\nCordialement,\nL'équipe des Puces de Béré`,
    };

    // Créer un objet FormData
    const formDataToSend = new FormData();
    formDataToSend.append('to', 'lespucesdebere@gmail.com');
    formDataToSend.append('subject', emailData.subject);
    formDataToSend.append('text', emailData.text);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formDataToSend
      });
      if (!response.ok) throw new Error("Email sending failed");
      return response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="mx-2 max-w-[1024px] pb-4">
      <br/>
      <p>
        La réservation pour les Puces de Béré 2026 le dimanche 18 janvier 2026 à la Halle de Béré de Châteaubriant ne sera disponible qu'à partir du 15 septembre 2026.
      </p>
      <p>
        Vous pouvez vous pré-inscrire pour être recontacté lorsque la réservation sera opérationnelle:
        
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <label htmlFor="firstName" className="block">Prénom</label>
            <input type="text" name="firstName" id="firstName" className="border rounded p-2 w-full" placeholder="Entrez votre prénom" required pattern="^[A-Za-zÀ-ÿ -]+$" onChange={handleChange}/>
          </div>
          <div className="mt-4">
            <label htmlFor="lastName" className="block">NOM</label>
            <input type="text" name="lastName" id="lastName" className="border rounded p-2 w-full" placeholder="Entrez votre nom de famille" required pattern="^[A-Za-zÀ-ÿ -]+$" onChange={handleChange}/>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block">E-mail</label>
            <input type="email" name="email" id="email" className="border rounded p-2 w-full" placeholder="Entrez votre adresse e-mail" required onChange={handleChange}/>
          </div>
          <div className="mt-4">
            <label htmlFor="tel" className="block">Téléphone</label>
            <input type="tel" name="tel" id="tel" className="border rounded p-2 w-full" placeholder="Entrez votre numero de téléphone" required pattern="^(0[1-9]([-. ]?[0-9]{2}){4}|(\+33|0)[1-9]([-. ]?[0-9]{2}){4})$" onChange={handleChange}/>
          </div>
          <button
            onClick={onSubmit}
            className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            Je veux être le premier informé
          </button>
        </form>
      </p>
      
    </div>
  );
}
