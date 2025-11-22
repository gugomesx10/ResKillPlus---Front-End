export interface Usuario {
  cpf_usuario: string;
  nome_usuario: string;
  email_usuario: string;
  senha_usuario?: string;
  telefone_usuario?: string;
  data_nascimento?: string;
}

export interface Curso {
  nome_curso: string;
  descricao_curso: string;
  carga_horaria: number;
  categoria_curso: string;
  nivel_curso?: string;
}

export interface Habilidade {
  nome_habilidade: string;
  descricao_habilidade: string;
  categoria_habilidade: string;
  nivel_dificuldade?: string;
}

export interface Matricula {
  cpf_usuario: string;
  nome_curso: string;
  data_matricula: string;
  status_matricula: string;
  progresso_curso?: number;
}

export interface Recomendacao {
  id?: number;
  cpf_usuario: string;
  nome_curso: string;
  motivo_recomendacao: string;
  data_recomendacao?: string;
}

export interface Pagamento {
  id?: number;
  corporacaoId: number;
  userId: number;
  quantia: number;
  status: string;
  dataPagamento?: string;
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
