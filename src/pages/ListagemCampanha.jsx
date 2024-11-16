import React, { useState, useEffect } from 'react';
import './ListagemCampanha.css';

export default function ListagemCampanha() {
  const [campanhas, setCampanhas] = useState([]);

  useEffect(() => {
    const storedCampanhas = JSON.parse(localStorage.getItem('campanhas')) || [];
    setCampanhas(storedCampanhas);
  }, []);

  const handleDelete = (index) => {
    const updatedCampanhas = campanhas.filter((_, i) => i !== index);
    setCampanhas(updatedCampanhas);
    localStorage.setItem('campanhas', JSON.stringify(updatedCampanhas));
  };

  return (
    <div className="listagem-container">
      <h1>Lista de Campanhas</h1>
      {campanhas.length === 0 ? (
        <p>Nenhuma campanha cadastrada.</p>
      ) : (
        <ul>
          {campanhas.map((campanha, index) => (
            <li key={index}>
              <strong>{campanha.nome}</strong> - {campanha.local}
              <button onClick={() => handleDelete(index)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
