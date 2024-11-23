import Campanha from "../Model/Entidades/Campanha.js";

const campanha = new Campanha();

class CampanhaController {
    async obterTodos(req, res) {
        try {
            const lista = await campanha.obterTodos();
            return res.status(200).json(lista);
        } catch (erro) {
            console.error('Erro ao obter campanhas:', erro);
            return res.status(500).json({ mensagem: 'Erro ao obter campanhas.' });
        }
    }

    async adicionar(req, res) {
        const { nome, local, descricao, dataInicio, dataFim } = req.body;

        try {
            const campanhaData = { nome, local, descricao, dataInicio, dataFim };
            const result = await campanha.insert(campanhaData); 

            if (result.affectedRows > 0) {
                return res.status(201).json({ message: 'Campanha cadastrada com sucesso!' });
            } else {
                return res.status(400).json({ message: 'Erro ao cadastrar campanha.' });
            }
        } catch (err) {
            console.error('Erro ao cadastrar campanha:', err);
            return res.status(500).json({ message: 'Erro interno ao cadastrar campanha.' });
        }
    }

    async excluir(req, res) {
        const { id } = req.params; 

        try {
            const { affectedRows } = await campanha.excluir(id); 

            if (affectedRows > 0) {
                return res.status(200).json({ message: 'Campanha excluída com sucesso.' });
            } else {
                return res.status(404).json({ message: 'Campanha não encontrada.' });
            }
        } catch (error) {
            console.error('Erro ao excluir campanha:', error);
            return res.status(500).json({ message: 'Erro ao excluir campanha.' });
        }
    }
}

export default CampanhaController;
