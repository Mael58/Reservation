import React, { useState } from 'react';
import axios from 'axios';
import instance from '../api';
import Cookies from 'js-cookie';

const Accueil = () => {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [user, setUser] = useState(null);
    const token = Cookies.get('token');

    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
   

    const getUserDetails = async () => {
try{
    const response = await axios.get('http://localhost:8000/user-details/', {
  withCredentials: true,
 
});
console.log(response.data);



setUser(response.data);

}catch(error){
console.error(error);
}
    }

    React.useEffect(() => {
       
        getUserDetails();
    }, []);

  

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            capacity: capacity,
         
        };

        axios.post('http://localhost:8000/add-room/', data)
        .then((response) => {
         if(response.data.message){
       
           

         }else{
            console.error(response.data.error);
         }

        })
        .catch((error) => {
            console.error(error);
        });
    }

    function logout(){
      instance.get('http://localhost:8000/logout/');
      Cookies.remove('token');
        window.location.href = '/';
    }

    return (
        <>
        <button onClick={logout}>Se déconnecter</button>
            <div>
                <h1>Accueil</h1>
            
                {user && user.is_staff && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nom de la room</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label htmlFor="number">Capacité</label>
                    <input type="number" id="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                    <br />
                    <button type="submit">Ajouter</button>
                </form>
                )}
            </div>
        </>
    );
}

export default Accueil;
