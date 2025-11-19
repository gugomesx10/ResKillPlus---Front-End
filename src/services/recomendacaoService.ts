import api from './api';
import { Recomendacao } from '../types';

export const recomendacaoService = {
  criar: (recomendacao: Recomendacao) => {
    return api.post('/recomendacao', recomendacao);
  },

  buscarPorCpf: (cpf: string) => {
    return api.get(`/recomendacao/buscar/${cpf}`);
  },

  listarTodas: () => {
    return api.get('/recomendacao');
  },

  atualizar: (recomendacao: Recomendacao) => {
    return api.put('/recomendacao', recomendacao);
  },

  excluir: (id: number) => {
    return api.delete(`/recomendacao/excluir/${id}`);
  },
};
