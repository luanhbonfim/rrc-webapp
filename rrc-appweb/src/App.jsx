import './App.css';
import MenuHamburguer from './components/MenuHamburguer/MenuHamburguer';
import CardsAtalho from './components/CardsAtalho/CardsAtalho';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Campanha from './pages/Campanha';
import ListagemCampanha from './pages/ListagemCampanha';
import GerenciarProdutos from './pages/GerenciarTiposProdutos';
import GerenciarMensalidades from './pages/Mensalidades';

function App() {
  return (
    <Router>
      <MenuHamburguer />
      <div className="container">
        <Routes>
          <Route path="/" element={<CardsAtalho />} />
          <Route path="/campanha" element={<Campanha />} />
          <Route path="/list-campanhas" element={<ListagemCampanha />} />
          <Route path="/gerenciar-tipos-produtos" element={<GerenciarProdutos />} />
          <Route path="/netflix-ta-cara-meus-anjos" element={<GerenciarMensalidades />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
