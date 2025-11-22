import api from './api';
import type { Usuario } from '../types';

export const usuarioService = {
  criar: (usuario: Usuario) => {
    return api.post('/usuario', usuario);
  },

  buscarPorCpf: (cpf_usuario: string) => {
    return api.get(`/usuario/buscar/${cpf_usuario}`);
  },

  validar: (cpf_usuario: string, senha_usuario: string) => {
    return api.get(`/usuario/validar/${cpf_usuario}/${senha_usuario}`);
  },

  atualizar: (usuario: Usuario) => {
    return api.put('/usuario', usuario);
  },

  excluir: (cpf_usuario: string) => {
    return api.delete(`/usuario/excluir/${cpf_usuario}`);
  },
};
