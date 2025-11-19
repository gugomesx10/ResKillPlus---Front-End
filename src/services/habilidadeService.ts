import api from './api';
import type { Habilidade } from '../types';

export const habilidadeService = {
  criar: (habilidade: Habilidade) => {
    return api.post('/habilidade', habilidade);
  },

  buscarPorNome: (nome: string) => {
    return api.get(`/habilidade/buscar/${nome}`);
  },

  listarTodas: () => {
    return api.get('/habilidade');
  },

  atualizar: (habilidade: Habilidade) => {
    return api.put('/habilidade', habilidade);
  },

  excluir: (nome: string) => {
    return api.delete(`/habilidade/excluir/${nome}`);
  },
};
