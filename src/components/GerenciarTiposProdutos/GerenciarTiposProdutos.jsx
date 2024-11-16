import './style.css';
import { useState } from 'react';

export default function GerenciarTiposProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState("");

  const handleAddProduto = () => {
    setProdutos([...produtos, novoProduto]);
    setNovoProduto("");
  };

  return (
    <div className="gerenciar-produtos">
      <h1>Gerenciar Tipos de Produtos</h1>
      <input
        type="text"
        value={novoProduto}
        onChange={(e) => setNovoProduto(e.target.value)}
        placeholder="Digite o nome do produto"
      />
      <button onClick={handleAddProduto}>Adicionar Produto</button>
      <ul>
        {produtos.map((produto, index) => (
          <li key={index}>{produto}</li>
        ))}
      </ul>
    </div>
  );
}
