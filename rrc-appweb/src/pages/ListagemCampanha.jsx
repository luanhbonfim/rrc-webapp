import React, { useState, useEffect } from 'react';
import './ListagemCampanha.css';
import CampanhaService from '../services/CampanhaService.js';
import InputMask from 'react-input-mask';

const campanhaService = new CampanhaService();

// Função para formatar as datas
const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  if (data instanceof Date && !isNaN(data)) {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(data);
  }
  return ''; // Retorna uma string vazia se a data for inválida
};

// Função para converter data para o formato YYYY-MM-DD
const formatarDataParaInput = (dataISO) => {
  const data = new Date(dataISO);
  const ano = data.getFullYear();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const dia = data.getDate().toString().padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

export default function ListagemCampanha() {
  const [campanhas, setCampanhas] = useState([]);
  const [erro, setErro] = useState(null);
  const [campanhaEditando, setCampanhaEditando] = useState(null);
  const [erroData, setErroData] = useState(null); // Erro de validação das datas

  // Função para carregar campanhas
  const carregarCampanhas = async () => {
    try {
      const dados = await campanhaService.obterTodasCampanhas();
      console.log('Dados recebidos do backend:', dados);
      setCampanhas(dados.rows || []);
    } catch (e) {
      console.error('Erro ao carregar campanhas:', e);
      setErro('Erro ao carregar campanhas. Verifique sua conexão ou a API.');
    }
  };

  useEffect(() => {
    carregarCampanhas();
  }, []);

  const excluirCampanha = async (id) => {
    try {
      await campanhaService.excluirCampanha(id);
      setCampanhas(campanhas.filter((campanha) => campanha.c_id !== id));
    } catch (e) {
      console.error('Erro ao excluir campanha:', e);
      setErro('Erro ao excluir campanha. Verifique sua conexão ou a API.');
    }
  };

  const iniciarEdicao = (campanha) => {
    setCampanhaEditando({
      ...campanha,
      // Convertendo as datas para o formato YYYY-MM-DD para o input de data
      c_data_inicio: formatarDataParaInput(campanha.c_data_inicio),
      c_data_fim: formatarDataParaInput(campanha.c_data_fim),
    });
  };

  // Função para validar as datas
  const validarDatas = () => {
    const dataInicio = new Date(campanhaEditando.c_data_inicio);
    const dataFim = new Date(campanhaEditando.c_data_fim);
    const dataAtual = new Date();

    if (dataInicio < dataAtual) {
      setErroData('A data de início não pode ser anterior a hoje.');
      return false;
    }

    if (dataFim < dataInicio) {
      setErroData('A data final não pode ser anterior à data de início.');
      return false;
    }

    setErroData(null); // Limpa o erro de data
    return true;
  };

  const salvarEdicao = async () => {
    if (!validarDatas()) {
      return;
    }

    const campanhaAtualizada = {
      id: campanhaEditando.c_id,
      nome: campanhaEditando.c_nome,
      local: campanhaEditando.c_local,
      descricao: campanhaEditando.c_descricao,
      dataInicio: campanhaEditando.c_data_inicio,
      dataFim: campanhaEditando.c_data_fim,
    };

    console.log('Enviando para o back-end:', campanhaAtualizada);

    try {
      await campanhaService.editarCampanha(campanhaEditando.c_id, campanhaAtualizada);
      console.log('Campanha atualizada com sucesso!');

      // Recarregar as campanhas do banco após salvar
      carregarCampanhas();

      setCampanhaEditando(null); // Sai do modo de edição
    } catch (error) {
      console.error('Erro ao atualizar campanha:', error);
    }
  };

  const cancelarEdicao = () => {
    setCampanhaEditando(null);
  };

  return (
    <div className="listagem-campanha-container">
      <h1>Lista de Campanhas</h1>
      {erro && <p className="listagem-campanha-erro">{erro}</p>}
      {erroData && <p className="listagem-campanha-erro">{erroData}</p>} {/* Exibindo o erro de data */}
      {campanhas.length === 0 ? (
        <p>Não há campanhas cadastradas.</p>
      ) : (
        <ul className="listagem-campanha-ul">
          {campanhas.map((campanha) => (
            <li key={campanha.c_id} className="listagem-campanha-li">
              {campanhaEditando?.c_id === campanha.c_id ? (
                <form onSubmit={(e) => { e.preventDefault(); salvarEdicao(); }} className="form-edicao">
                  <div>
                    <label htmlFor="nome">Nome da Campanha:</label>
                    <input
                      id="nome"
                      type="text"
                      value={campanhaEditando.c_nome}
                      onChange={(e) =>
                        setCampanhaEditando((prev) => ({ ...prev, c_nome: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="local">Local da Campanha:</label>
                    <input
                      id="local"
                      type="text"
                      value={campanhaEditando.c_local}
                      onChange={(e) =>
                        setCampanhaEditando((prev) => ({ ...prev, c_local: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                      id="descricao"
                      value={campanhaEditando.c_descricao || ''}
                      onChange={(e) =>
                        setCampanhaEditando((prev) => ({ ...prev, c_descricao: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="data_inicio">Data de Início:</label>
                    <input
                      id="data_inicio"
                      type="date"
                      value={campanhaEditando.c_data_inicio}
                      onChange={(e) =>
                        setCampanhaEditando((prev) => ({ ...prev, c_data_inicio: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="data_fim">Data Final:</label>
                    <input
                      id="data_fim"
                      type="date"
                      value={campanhaEditando.c_data_fim}
                      onChange={(e) =>
                        setCampanhaEditando((prev) => ({ ...prev, c_data_fim: e.target.value }))
                      }
                    />
                  </div>

                  <button type="submit" className="listagem-campanha-btn-salvar">Salvar</button>
                  <button type="button" onClick={cancelarEdicao} className="listagem-campanha-btn-cancelar">Cancelar</button>
                </form>
              ) : (
                <>
                  <strong>{campanha.c_nome}</strong>
                  <span>{campanha.c_local}</span>
                  <span>{formatarData(campanha.c_data_inicio)} - {formatarData(campanha.c_data_fim)}</span>
                  <span>{campanha.c_descricao || 'Sem descrição'}</span> {/* Exibindo descrição */}
                  <button onClick={() => iniciarEdicao(campanha)} className="listagem-campanha-btn-editar">Editar</button>
                  <button onClick={() => excluirCampanha(campanha.c_id)} className="listagem-campanha-btn-excluir">Excluir</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
