import mysql from 'mysql2/promise';

class DataBase {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',   
            password: '',   
            database: 'rotaract_db',  
        });
    }

    async ExecutaComando(sql, params = []) {
        const connection = await this.pool.getConnection();

        try {
            const [rows, fields] = await connection.query(sql, params); 
            return { rows, affectedRows: rows.affectedRows };
        } catch (e) {
            console.log("Erro no Banco", e);
            throw e; 
        } finally {
            connection.release();
        }
    }
}

export default DataBase;
