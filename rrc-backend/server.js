import express from 'express';
import cors from 'cors';
import produtos from './Routes/ProdutoRoutes.js'; 
import routes from './Routes/CampanhaRoutes.js'; 
import mensalidadeRoutes from "./Routes/MensalidadeRoutes.js";

 

const app = express();
const port = 3002;

app.use(cors({
    origin: 'http://localhost:3000' 
}));

app.use(express.json());
app.use(produtos)
app.use(routes)
app.use(mensalidadeRoutes);

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
});