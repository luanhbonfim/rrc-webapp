import express from 'express';
import cors from 'cors';
import produtos from './Routes/ProdutoRoutes.js'; 
import routes from './Routes/CampanhaRoutes.js'; 

const app = express();
const port = 3002;

app.use(cors({
    origin: 'http://localhost:3000' 
}));

app.use(express.json());
app.use(produtos)
app.use(routes)

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
});