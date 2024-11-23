import express from 'express';
import cors from 'cors';
import campanhaRoutes from './Routes/CampanhaRoutes.js'; 



const app = express();
const port = 3002;

app.use(cors({
    origin: 'http://localhost:3000' 
}));

app.use(express.json());
app.use(campanhaRoutes)

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
});