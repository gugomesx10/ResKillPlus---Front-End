import api from './api';
import type { Curso } from '../types';

export const cursoService = {
  criar: (curso: Curso) => {
    return api.post('/curso', curso);
  },

  buscarPorNome: (nome_curso: string) => {
    return api.get(`/curso/buscar/${nome_curso}`);
  },

  listarTodos: () => {
    return api.get('/curso');
  },

  atualizar: (curso: Curso) => {
    return api.put('/curso', curso);
  },

  excluir: (nome_curso: string) => {
    return api.delete(`/curso/excluir/${nome_curso}`);
  },
};
