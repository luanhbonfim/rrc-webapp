import mysql from 'mysql2/promise';

class DataBase {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',   
            password: '',   
            database: 'pid',  
        });
    }

    async ExecutaComando(sql, params = []) {
        const connection = await this.pool.getConnection();

        try {
            const [rows, fields] = await connection.query(sql, params); 
            return { rows, affectedRows: rows.affectedRows };
        } catch (e) {
            console.log("Erro no Banco", e);
            throw e; // Repassa o erro para o controlador tratar
        } finally {
            connection.release();
        }
    }
}

export default DataBase;
