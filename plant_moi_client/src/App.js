import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRecherche from './components/PageRecherche.js'
import PageConnexion from './components/PageConnexion';
import PageInscription from './components/PageInscription';
import PageProfil from './components/PageProfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageRecherche />} />
        <Route path='/Connexion' element={<PageConnexion />} /> 
        <Route path='/Inscription' element={<PageInscription />}/>
        <Route path='/Profil' element={<PageProfil />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
