import './App.css';
import MenuHamburguer from './components/MenuHamburguer/MenuHamburguer';
import CardsAtalho from './components/CardsAtalho/CardsAtalho';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Campanha from './pages/Campanha';
import ListagemCampanha from './pages/ListagemCampanha';

function App() {
  return (
    <Router>
      <MenuHamburguer />
      <div className="container">
        <Routes>
          <Route path="/" element={<CardsAtalho />} />
          <Route path="/campanha" element={<Campanha />} />
          <Route path="/campanhas" element={<ListagemCampanha />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;