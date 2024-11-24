import TipoProduto from "../Model/Entidades/TipoProdutos.js";

class ProdutoController {
    constructor() {
        this.tipoProduto = new TipoProduto(); // Instancia a entidade TipoProduto
    }

    // Listar todos os produtos
    async listarProdutos(req, res) {
        try {
            const produtos = await this.tipoProduto.obterTodos(); // Chama o método que obtém todos os produtos
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar produtos" });
        }
    }

    // Adicionar um novo produto
    async adicionarProduto(req, res) {
        try {
            const { nome, quantidade, unidade, detalhes, data } = req.body;

            // Verifica se os campos obrigatórios estão presentes
            if (!nome || !quantidade || !unidade || !data) {
                return res.status(400).json({ error: "Campos obrigatórios faltando" });
            }
 
            const produto = new TipoProduto(null, nome, quantidade, unidade, detalhes, data);
 
            await this.tipoProduto.insert(produto);

            res.status(201).json({ message: "Produto adicionado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao adicionar produto" });
        }
    }

    // Excluir um produto
    async excluirProduto(req, res) {
        try {
            const id = req.params.id;
    
            // Verifica se o ID foi fornecido
            if (!id) {
                return res.status(400).json({ error: "ID do produto não fornecido" });
            }
    
            // Chama o método de exclusão da entidade TipoProduto
            const result = await this.tipoProduto.excluir(id);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }
    
            res.status(200).json({ message: "Produto excluído com sucesso!" });
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            res.status(500).json({ error: "Erro ao excluir produto: " + error.message });
        }
    }
    
    // Atualizar um produto
    async atualizarProduto(req, res) {
        try {
            const id = req.params.id;
            const { nome, quantidade, unidade, detalhes, data } = req.body;
    
            // Verifica se os campos obrigatórios estão presentes
            if (!nome || !quantidade || !unidade || !data) {
                return res.status(400).json({ error: "Campos obrigatórios faltando" });
            }
    
            // Verifica se o produto existe no banco de dados antes de atualizar
            const produtoExistente = await this.tipoProduto.obterTodos();
    
            console.log('Produto Existente:', produtoExistente);  // Para verificar o retorno da consulta
    
            // Acesse a propriedade 'rows' para encontrar o produto
            const produto = produtoExistente.rows.find((produto) => produto.id === parseInt(id));
    
            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }
    
            // Cria o objeto tipoProduto com os novos dados
            const novoProduto = new TipoProduto(id, nome, quantidade, unidade, detalhes, data);
    
            // Chama o método de atualização
            const result = await this.tipoProduto.atualizar(novoProduto);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Produto não encontrado para atualizar" });
            }
    
            res.status(200).json({ message: "Produto atualizado com sucesso!" });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ error: "Erro ao atualizar produto: " + error.message });
        }
    }
    
    
}

export default ProdutoController;
