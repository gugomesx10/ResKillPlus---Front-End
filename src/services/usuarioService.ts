import api from './api';
import type { Usuario } from '../types';

export const usuarioService = {
  criar: (usuario: Usuario) => {
    return api.post('/usuario', usuario);
  },

  buscarPorCpf: (cpf: string) => {
    return api.get(`/usuario/buscar/${cpf}`);
  },

  validar: (cpf: string, senha: string) => {
    return api.get(`/usuario/validar/${cpf}/${senha}`);
  },

  atualizar: (usuario: Usuario) => {
    return api.put('/usuario', usuario);
  },

  excluir: (cpf: string) => {
    return api.delete(`/usuario/excluir/${cpf}`);
  },
};
