import React, { useState, useEffect } from "react";
import ProdutoService from "../services/ProdutoService.js"; 
import "./GerenciarTiposProdutos.css";  

const produtoService = new ProdutoService();


const GerenciarProdutos = () => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("KG");
  const [detalhes, setDetalhes] = useState("");
  const [adicionados, setAdicionados] = useState([]);
  const [cadastrados, setCadastrados] = useState([]);
  const [erros, setErros] = useState({ nome: false, quantidade: false });
  const [produtoEditando, setProdutoEditando] = useState(null);  

 
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await produtoService.getAllProdutos();
        console.log("Produtos recebidos da API:", data);
        console.log("Estrutura de dados:", data.rows);  
        setCadastrados(data.rows || []);
      } catch (error) {
        console.error("Erro ao carregar produtos cadastrados", error);
      }
    };
    
  
    fetchProdutos();
  }, []);
  
  
  
  const adicionarProduto = () => {
    if (!nome || !quantidade) {
      setErros({
        nome: !nome,
        quantidade: !quantidade,
      });
      return;
    }
  
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, "0")}-${dataAtual.getDate().toString().padStart(2, "0")} ${dataAtual.getHours().toString().padStart(2, "0")}:${dataAtual.getMinutes().toString().padStart(2, "0")}:${dataAtual.getSeconds().toString().padStart(2, "0")}`;
  
    const novoProduto = {
      nome,
      quantidade,
      unidade,
      detalhes: detalhes || "Nenhum detalhe",
      data: dataFormatada,
    };
  
  
    setAdicionados(prevAdicionados => [...prevAdicionados, novoProduto]);
  
    setNome("");
    setQuantidade("");
    setDetalhes("");
    setUnidade("KG");
    setErros({ nome: false, quantidade: false });
  };

  const cadastrarProdutos = () => {
    const produtosParaCadastrar = [...adicionados];

    produtosParaCadastrar.forEach((produto, index) => {
      produtoService.adicionarProduto([produto]) 
        .then(() => {
          setCadastrados(prevCadastrados => [...prevCadastrados, produto]);
          
       
          setAdicionados(prevAdicionados => prevAdicionados.filter((_, i) => i !== index));
        })
        .catch((error) => {
          console.error("Erro ao cadastrar produto", error);  
        });
    });
  };
  
  const excluirProdutoAdicionado = (index) => {
    setAdicionados(adicionados.filter((_, i) => i !== index));
  };
  
  const excluirProduto = (index, isAdicionado) => {
    if (isAdicionado) {
      setAdicionados(adicionados.filter((_, i) => i !== index));
    } else {
      produtoService.excluirProduto(cadastrados[index].id) 
        .then(() => {
          setCadastrados(cadastrados.filter((_, i) => i !== index));
        })
        .catch((error) => {
          console.error("Erro ao excluir produto", error);
        });
    }
  };

  const editarProduto = (produto) => {
    console.log("Produto para edição:", produto);  
    console.log("Produto ID:", produto.id); 
    setProdutoEditando(produto);
    setNome(produto.nome);
    setQuantidade(produto.quantidade);
    setUnidade(produto.unidade);
    setDetalhes(produto.detalhes);
  };
  

  const salvarEdicao = () => {
    if (!nome || !quantidade) {
      setErros({
        nome: !nome,
        quantidade: !quantidade,
      });
      return;
    }
  
    const dataAtualizada = new Date().toISOString().replace('T', ' ').split('.')[0];
  
    produtoService.atualizarProduto(produtoEditando.id, { nome, quantidade, unidade, detalhes, data: dataAtualizada })
      .then(() => {
        const produtosAtualizados = cadastrados.map((produto) =>
          produto.id === produtoEditando.id
            ? { ...produto, nome, quantidade, unidade, detalhes, data: dataAtualizada }
            : produto
        );
        setCadastrados(produtosAtualizados);
        cancelarEdicao();
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto", error);
      });
  };

  
  // const salvarEdicao = () => {
  //   if (!nome || !quantidade) {
  //     setErros({
  //       nome: !nome,
  //       quantidade: !quantidade,
  //     });
  //     return;
  //   }
  
  //   console.log("ID DO PRODUTO", produtoEditando.id);
  //   produtoService.atualizarProduto(produtoEditando.id, { nome, quantidade, unidade, detalhes })
  //     .then(() => {
  //       const produtosAtualizados = cadastrados.map((produto) =>
  //         produto.id === produtoEditando.id
  //           ? { ...produto, nome, quantidade, unidade, detalhes }
  //           : produto
  //       );
  //       setCadastrados(produtosAtualizados);
  //       cancelarEdicao();
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao atualizar produto", error);
  //     });
  // };

  const cancelarEdicao = () => {
    setProdutoEditando(null);
    setNome("");
    setQuantidade("");
    setDetalhes("");
    setUnidade("KG");
    setErros({ nome: false, quantidade: false });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>Gerenciar Produtos</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Formulário */}
        <div
          style={{
            width: "45%",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>
            {produtoEditando ? "Editar Produto" : "Cadastrar Produtos"}
          </h3>
          <input
            type="text"
            placeholder="Digite o nome do produto *"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: erros.nome ? "1px solid red" : "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          {erros.nome && (
            <p style={{ color: "red", margin: "0 0 10px 0" }}>
              Nome é obrigatório!
            </p>
          )}
          <input
            type="number"
            placeholder="Quantidade *"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: erros.quantidade ? "1px solid red" : "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          {erros.quantidade && (
            <p style={{ color: "red", margin: "0 0 10px 0" }}>
              Quantidade é obrigatória!
            </p>
          )}
          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="KG">KG</option>
            <option value="Grama">Grama</option>
            <option value="Litro">Litro</option>
            <option value="Unidade">Unidade</option>
            <option value="Caixa">Caixa</option>
          </select>
          <textarea
            placeholder="Adicionar detalhes (opcional)"
            value={detalhes}
            onChange={(e) => setDetalhes(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={produtoEditando ? salvarEdicao : adicionarProduto}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            {produtoEditando ? "Salvar Edição" : "+ Adicionar Produto"}
          </button>
          {produtoEditando && (
            <button
              onClick={cancelarEdicao}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          )}
        </div>

        {/* Produtos Adicionados */}
        <div style={{ width: "50%" }}>
          <h3>Produtos Adicionados</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Unidade</th>
                <th>Detalhes</th>
                <th>Data</th>  
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(adicionados) && adicionados.map((produto, index) => (
              <tr key={produto.id || index}>   
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.unidade}</td>
                <td>{produto.detalhes}</td>
                <td>{produto.data}</td>
                <td>
                  <button
                    onClick={() => excluirProdutoAdicionado(index)}  
                    style={{
                      backgroundColor: "red",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <button
            onClick={cadastrarProdutos}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cadastrar Produtos
          </button>
        </div>
      </div>

      {/* Produtos Cadastrados */}
      <div style={{ marginTop: "30px" }}>
        <h3>Produtos Cadastrados</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Detalhes</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(cadastrados) && cadastrados.map((produto, index) => (
          <tr  key={produto.id || index}>
            <td>{produto.nome}</td>
            <td>{produto.quantidade}</td>
            <td>{produto.unidade}</td>
            <td>{produto.detalhes}</td>
            <td>{produto.data}</td>
            <td>
              <button
                onClick={() => editarProduto(produto)}
                style={{
                  backgroundColor: "#ffc107",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
              <button
                onClick={() => excluirProduto(index, false)}
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GerenciarProdutos;
