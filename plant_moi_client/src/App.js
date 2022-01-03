import './App.css';
import Header from './components/Header.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRecherche from './components/PageRecherche.js'
import PageConnexion from './components/PageConnexion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageRecherche />} />
        <Route path='/Connexion' element={<PageConnexion />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
