import api from './api';
import type { Pagamento } from '../types';

export const pagamentoService = {
  criar: (pagamento: Pagamento) => {
    return api.post('/pagamento', pagamento);
  },

  listarTodos: () => {
    return api.get('/pagamento');
  },

  buscarPorId: (id: number) => {
    return api.get(`/pagamento/${id}`);
  },

  atualizarStatus: (id: number, status: string) => {
    return api.put(`/pagamento/${id}/status?valor=${status}`, {});
  },

  excluir: (id: number) => {
    return api.delete(`/pagamento/${id}`);
  },
};
