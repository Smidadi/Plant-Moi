import './App.css';
import Header from './components/Header.js'
import PageRecherche from './components/PageRecherche.js'

function App() {
  return (
    <div class="container-fluid">
      <div class="row bar"> 
        <div class="container">
            <PageRecherche />
        </div>
      </div>
    </div>
  );
}

export default App;
