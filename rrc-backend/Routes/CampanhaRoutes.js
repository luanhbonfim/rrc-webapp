import express from 'express';
import CampanhaController from "../Controller/CampanhaController.js";

const campanhaController = new CampanhaController();
const router = express.Router();

// Obter todas as campanhas
router.get('/campanhas', campanhaController.obterTodos.bind(campanhaController));

// Adicionar uma nova campanha
router.post('/campanha', campanhaController.adicionar.bind(campanhaController));

// Excluir uma campanha pelo ID
router.delete('/campanha/:id', campanhaController.excluir.bind(campanhaController));

router.put('/campanha/:id', campanhaController.editar);

export default router;
