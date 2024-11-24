const API_BASE_URL = "http://localhost:3002";

class ProdutoService {
  async getAllProdutos() {
    const response = await fetch(`${API_BASE_URL}/gerenciar-tipos-produtos`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao obter os produtos');
    }

    return await response.json();
  }
  
  async adicionarProduto(produto) {
    try {
      console.log('Produto enviado:', produto);  // Verifique os dados do produto
  
      const response = await fetch(`${API_BASE_URL}/gerenciar-tipos-produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto[0]),  // Envie o primeiro item do array (objeto)
      });
  
      console.log('Status da resposta:', response.status);
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erro ao adicionar produto:', errorData);
        throw new Error('Erro ao adicionar produto');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
  
  

  async atualizarProduto(id, produto) {
    const response = await fetch(`${API_BASE_URL}/gerenciar-tipos-produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }

    return await response.json();
  }

  async excluirProduto(id) {
    const response = await fetch(`${API_BASE_URL}/gerenciar-tipos-produtos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir produto');
    }

    return await response.json();
  }
}

export default ProdutoService;
