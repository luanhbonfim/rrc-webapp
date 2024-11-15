import './App.css';
import MenuHamburguer from './components/MenuHamburguer/MenuHamburguer';
import CardsAtalho from './components/CardsAtalho/CardsAtalho';

function App() {
  return (
    <>
      <MenuHamburguer />
      <div className="container">
        <CardsAtalho />
      </div>
    </>
  );
}

export default App;
