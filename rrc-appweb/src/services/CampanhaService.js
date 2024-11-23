const API_BASE_URL = "http://localhost:3002";

class CampanhaService {
  async obterTodasCampanhas() {
    const response = await fetch(`${API_BASE_URL}/campanhas`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('ERRO');
    }

    const dados = await response.json();
    return dados;
  }

  async excluirCampanha(id) {
    const response = await fetch(`${API_BASE_URL}/campanhas/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir campanha');
    }

    return response.json();
  }

  
  async adicionarCampanha(campanha) {
    const response = await fetch(`${API_BASE_URL}/campanha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campanha),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar a campanha');
    }

    return response.json(); 
  }
}

export default CampanhaService;
