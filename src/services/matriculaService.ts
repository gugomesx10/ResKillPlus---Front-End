import api from './api';
import { Matricula } from '../types';

export const matriculaService = {
  criar: (matricula: Matricula) => {
    return api.post('/matricula', matricula);
  },

  buscar: (cpfUsuario: string, nomeCurso: string) => {
    return api.get(`/matricula/buscar/${cpfUsuario}/${nomeCurso}`);
  },

  listarTodas: () => {
    return api.get('/matricula');
  },

  atualizar: (matricula: Matricula) => {
    return api.put('/matricula', matricula);
  },

  excluir: (cpfUsuario: string, nomeCurso: string) => {
    return api.delete(`/matricula/excluir/${cpfUsuario}/${nomeCurso}`);
  },
};
