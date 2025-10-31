'use client';
import { Metadata } from 'next';
import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
  });
  const onSubmit = async (event: React.FormEvent) => {
    const validated = await validateForm(event);
    if(!validated) return;
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
    const nameRegex = /^[A-Za-z\u00C0-\u017F' -]+$/;
    if (!nameRegex.test(firstName.trim())) {
        alert("Veuillez ne pas insérer de caractères spéciaux dans votre prénom");
        return false;
    }
    if (!lastName) {
        alert("Veuillez remplir votre nom de famille");
        return false;
    }
    if (!nameRegex.test(lastName.trim())) {
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
    const phoneRegex = /^(0[1-9]([-. ]?[0-9]{2}){4}|\+33[1-9]([-. ]?[0-9]{2}){4})$/;
    if (!phoneRegex.test(tel.trim())) {
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
      return true;
    } catch (error) {
      console.error('Error:', error);
    }
    return false;
  };
  return (
    <div className="mx-2 max-w-[1024px] pb-4">
      <br/>
      <p>
        La réservation pour les Puces de Béré 2026 le dimanche 18 janvier 2026 à la Halle de Béré de Châteaubriant ne sera disponible qu&apos;à partir du 15 septembre 2026.
      </p>
      <p>
        Vous pouvez vous pré-inscrire pour être recontacté lorsque la réservation sera opérationnelle:
        <br/><br/>
        <form onSubmit={onSubmit} action="javascript:void(0)">
          <h2>Pré-inscription</h2>
          <div className="mt-4">
            <label htmlFor="firstName" className="block">Prénom</label>
            <input type="text" name="firstName" id="firstName" className="border rounded p-2 w-full" placeholder="Entrez votre prénom" required onChange={handleChange} value={formData.firstName}/>
          </div>
          <div className="mt-4">
            <label htmlFor="lastName" className="block">NOM</label>
            <input type="text" name="lastName" id="lastName" className="border rounded p-2 w-full" placeholder="Entrez votre nom de famille" required onChange={handleChange} value={formData.lastName}/>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block">E-mail</label>
            <input type="email" name="email" id="email" className="border rounded p-2 w-full" placeholder="Entrez votre adresse e-mail" required onChange={handleChange} value={formData.email}/>
          </div>
          <div className="mt-4">
            <label htmlFor="tel" className="block">Téléphone</label>
            <input type="tel" name="tel" id="tel" className="border rounded p-2 w-full" placeholder="Entrez votre numero de téléphone" required onChange={handleChange} value={formData.tel}/>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            Je veux être le premier informé
          </button>
        </form>
      </p>
      
    </div>
  );
}
