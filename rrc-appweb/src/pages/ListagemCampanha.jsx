import React, { useState, useEffect } from 'react';
import './ListagemCampanha.css';
import CampanhaService from '../services/CampanhaService.js';

const campanhaService = new CampanhaService();

const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(data); 
};

export default function ListagemCampanha() {
  const [campanhas, setCampanhas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarCampanhas = async () => {
      try {
        const dados = await campanhaService.obterTodasCampanhas(); 
        setCampanhas(dados.rows || []);  
      } catch (e) {
        console.error('Erro ao buscar campanhas:', e);
        setErro('Erro ao carregar campanhas. Verifique sua conexão ou a API.');
      }
    };

    carregarCampanhas();
  }, []);

  // Função para excluir campanha
  const excluirCampanha = async (id) => {
    try {
      await campanhaService.excluirCampanha(id); 
      setCampanhas(campanhas.filter((campanha) => campanha.c_id !== id)); 
    } catch (e) {
      console.error('Erro ao excluir campanha:', e);
      setErro('Erro ao excluir campanha. Verifique sua conexão ou a API.');
    }
  };

  return (
    <div className="listagem-campanha-container">
      <h1>Lista de Campanhas</h1>
      {erro && <p className="listagem-campanha-erro">{erro}</p>}
      {campanhas.length === 0 ? (
        <p>Não há campanhas cadastradas.</p>
      ) : (
        <ul className="listagem-campanha-ul">
          {campanhas.map((campanha) => (
            <li key={campanha.c_id} className="listagem-campanha-li">
              <strong>{campanha.c_nome}</strong>
              <p>{campanha.c_local}</p>
              <p>{campanha.c_descricao}</p>
              <span>{formatarData(campanha.c_data_inicio)} - {formatarData(campanha.c_data_fim)}</span>
              <button onClick={() => excluirCampanha(campanha.c_id)} className="listagem-campanha-btn-excluir">
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
