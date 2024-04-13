
import axios from 'axios';
import React, { useState, C } from 'react';
import Cookies from 'js-cookie';


const Connexion  = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password
        };

        axios.post('http://localhost:8000/login/', data)
            .then((response) => {
             if(response.data.message){
                
                Cookies.set('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
                window.location.href = "/Accueil";
             }else{
                console.error(response.data.error);
             }

            })
            .catch((error) => {
                console.error(error);
            });

    }
    return (
        <>

         <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Nom d'utilisateur</label>
        <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
   <a href="/inscription">S'inscrire</a>
    

        </>
    );
}

export default Connexion;