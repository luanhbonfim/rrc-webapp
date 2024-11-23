import DataBase from "../database.js";

const database = new DataBase();

class Campanha {
    constructor (id, nome, local, desc, dataInicio, dataFim) {
        this.id = id;
        this.nome = nome;
        this.local = local;
        this.desc = desc;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;

    }

    async obterTodos () {
        const campanhas = await database.ExecutaComando('SELECT * FROM CAMPANHA')
        return campanhas;
    }

    async excluir(id) {
        try {
            const result = await database.ExecutaComando('DELETE FROM CAMPANHA WHERE c_id = ?', [id]);
            return result; 
        } catch (err) {
            throw new Error('Erro ao excluir campanha: ' + err.message);
        }
    }

    
    async insert(campanha) {
        const { nome, local, descricao, dataInicio, dataFim } = campanha;

        try {
            const result = await database.ExecutaComando(
                'INSERT INTO CAMPANHA (c_nome, c_local, c_descricao, c_data_inicio, c_data_fim) VALUES (?, ?, ?, ?, ?)', 
                [nome, local, descricao, dataInicio, dataFim]
            );

            return result;
        } catch (err) {
            throw new Error('Erro ao inserir campanha: ' + err.message);
        }
    }
}


export default Campanha;