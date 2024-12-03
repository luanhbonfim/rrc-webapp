import express from 'express';
import ComissaoController from "../Controller/ComissaoController.js";

const comissaoController = new ComissaoController();
const router = express.Router();

// Obter todas as comissões
router.get('/comissoes', comissaoController.obterTodos.bind(comissaoController));

// Adicionar uma nova comissão
router.post('/comissao', comissaoController.adicionar.bind(comissaoController));

// Atualizar uma comissão
router.put('/comissao/:id', comissaoController.editar.bind(comissaoController));

// Excluir uma comissão
router.delete('/comissao/:id', comissaoController.excluir.bind(comissaoController));

export default router;
