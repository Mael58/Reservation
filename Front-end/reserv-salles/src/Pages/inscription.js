import React, { useState } from 'react';
import axios from 'axios';

const Inscription = () => {
  // Utilisez le hook useState pour stocker les valeurs saisies dans les champs de formulaire
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[email, setEmail] = useState('');

  // Définissez une fonction pour gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email
    };

    axios.post('http://localhost:8000/signup/', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Mot de passe :</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Inscription;
