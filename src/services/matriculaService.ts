import api from './api';
import type { Matricula } from '../types';

export const matriculaService = {
  criar: (matricula: Matricula) => {
    return api.post('/matricula', matricula);
  },

  buscar: (cpf_usuario: string, nome_curso: string) => {
    return api.get(`/matricula/buscar/${cpf_usuario}/${nome_curso}`);
  },

  listarTodas: () => {
    return api.get('/matricula');
  },

  atualizar: (matricula: Matricula) => {
    return api.put('/matricula', matricula);
  },

  excluir: (cpf_usuario: string, nome_curso: string) => {
    return api.delete(`/matricula/excluir/${cpf_usuario}/${nome_curso}`);
  },
};
