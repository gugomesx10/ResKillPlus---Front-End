export interface Usuario {
  cpf_usuario: string;
  nome_usuario: string;
  mail_usuario: string;
  senha?: string;
  dt_nasc?: string;
  end_usuario?: string;
}

export interface Curso {
  nome_curso: string;
  descricao_curso: string;
  carga_horaria: number;
  categoria: string;
}

export interface Habilidade {
  nome_habilidade: string;
  descricao_habilidade: string;
  nivel: string;
  area: string;
}

export interface Matricula {
  cpf_usuario: string;
  nome_curso: string;
  dt_matricula: string;
  status: string;
}

export interface Recomendacao {
  id?: number;
  cpf_usuario: string;
  nome_curso: string;
  motivo: string;
  data_recomendacao?: string;
}

export interface Pagamento {
  id?: number;
  corporacao_id: number;
  user_id: number;
  quantia: number;
  status: string;
  dt_criacao?: string;
}

export interface AuthUser {
  nome?: string;
  email?: string;
  avatar?: string;
  avatarUrl?: string;
  accessToken?: string;
  provider?: string;
  providerId?: string;
}
