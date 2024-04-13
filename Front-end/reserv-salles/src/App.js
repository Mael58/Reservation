
import './App.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inscription from './Pages/inscription';
import Connexion from './Pages/connexion';
import Accueil from './Pages/accueil';
import Salles from './Pages/salles';

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      
      <Route path="/" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path='/Accueil' element={<Accueil/>} />
      <Route path='/salles' element={<Salles/>} />
         
          
      </Routes>
    </BrowserRouter>





   
    </>
  );
}


