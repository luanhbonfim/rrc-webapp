import React, { useState } from 'react';

const GerenciarMensalidades = () => {
  const [mensalidades, setMensalidades] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [status, setStatus] = useState('Pendente');
  
  const adicionarMensalidade = () => {
    if (!descricao || !valor || !dataVencimento) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaMensalidade = {
      id: new Date().getTime(),
      descricao,
      categoria,
      valor: parseFloat(valor),
      dataVencimento,
      status,
    };

    setMensalidades([...mensalidades, novaMensalidade]);
    setDescricao('');
    setCategoria('');
    setValor('');
    setDataVencimento('');
    setStatus('Pendente');
  };

  const excluirMensalidade = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta mensalidade?')) {
      setMensalidades(mensalidades.filter((mensalidade) => mensalidade.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>Gerenciar Mensalidades</h2>

      {/* Formulário */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Descrição *"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        />
        <input
          type="number"
          placeholder="Valor *"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        />
        <input
          type="date"
          value={dataVencimento}
          onChange={(e) => setDataVencimento(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        >
          <option value="Pendente">Pendente</option>
          <option value="Pago">Pago</option>
        </select>
        <button onClick={adicionarMensalidade} style={{ margin: '5px', padding: '10px' }}>
          Adicionar
        </button>
      </div>

      <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data de Vencimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mensalidades.map((mensalidade) => (
            <tr key={mensalidade.id}>
              <td>{mensalidade.descricao}</td>
              <td>{mensalidade.categoria || '-'}</td>
              <td>{mensalidade.valor.toFixed(2)}</td>
              <td>{mensalidade.dataVencimento}</td>
              <td>{mensalidade.status}</td>
              <td>
                <button onClick={() => excluirMensalidade(mensalidade.id)} style={{ marginRight: '5px' }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GerenciarMensalidades;
