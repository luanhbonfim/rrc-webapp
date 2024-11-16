import React, { useState } from 'react';
import './Campanha.css';

export default function Campanha() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    local: '',
    dataInicio: '',
    horaInicio: '',
    dataFim: '',
    horaFim: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const campanhas = JSON.parse(localStorage.getItem('campanhas')) || [];
    campanhas.push(formData);
    localStorage.setItem('campanhas', JSON.stringify(campanhas));
    alert('Campanha cadastrada com sucesso!');
    setFormData({
      nome: '',
      descricao: '',
      local: '',
      dataInicio: '',
      horaInicio: '',
      dataFim: '',
      horaFim: '',
    });
  };

  return (
    <div className="campanha-container">
      <h1>Cadastro de Campanha</h1>
      <form onSubmit={handleSubmit} className="form-campanha">
        <div className="form-group">
          <label htmlFor="nome">Nome da Campanha:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            maxLength="200"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="local">Local:</label>
          <input
            type="text"
            id="local"
            name="local"
            value={formData.local}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataInicio">Data e Hora de Início:</label>
          <input
            type="date"
            id="dataInicio"
            name="dataInicio"
            value={formData.dataInicio}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            id="horaInicio"
            name="horaInicio"
            value={formData.horaInicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataFim">Data e Hora de Finalização (Opcional):</label>
          <input
            type="date"
            id="dataFim"
            name="dataFim"
            value={formData.dataFim}
            onChange={handleChange}
          />
          <input
            type="time"
            id="horaFim"
            name="horaFim"
            value={formData.horaFim}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-cadastrar">
          Cadastrar Campanha
        </button>
      </form>
    </div>
  );
}
