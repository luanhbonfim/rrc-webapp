import express from 'express';
import cors from 'cors';
import produtos from './Routes/ProdutoRoutes.js'; 

const app = express();
const port = 3002;

app.use(cors({
    origin: 'http://localhost:3000' 
}));

app.use(express.json());
app.use(produtos)

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
});