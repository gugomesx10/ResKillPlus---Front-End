import api from './api';
import { Curso } from '../types';

export const cursoService = {
  criar: (curso: Curso) => {
    return api.post('/curso', curso);
  },

  buscarPorNome: (nome: string) => {
    return api.get(`/curso/buscar/${nome}`);
  },

  listarTodos: () => {
    return api.get('/curso');
  },

  atualizar: (curso: Curso) => {
    return api.put('/curso', curso);
  },

  excluir: (nome: string) => {
    return api.delete(`/curso/excluir/${nome}`);
  },
};
