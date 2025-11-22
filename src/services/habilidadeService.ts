import api from './api';
import type { Habilidade } from '../types';

export const habilidadeService = {
  criar: (habilidade: Habilidade) => {
    return api.post('/habilidade', habilidade);
  },

  buscarPorNome: (nome_habilidade: string) => {
    return api.get(`/habilidade/buscar/${nome_habilidade}`);
  },

  listarTodas: () => {
    return api.get('/habilidade');
  },

  atualizar: (habilidade: Habilidade) => {
    return api.put('/habilidade', habilidade);
  },

  excluir: (nome_habilidade: string) => {
    return api.delete(`/habilidade/excluir/${nome_habilidade}`);
  },
};
