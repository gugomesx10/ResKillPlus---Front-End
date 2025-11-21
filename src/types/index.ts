export interface Usuario {
  cpf: string;
  nome: string;
  email: string;
  senha?: string;
  telefone?: string;
  dataNascimento?: string;
}

export interface Curso {
  nome: string;
  descricao: string;
  cargaHoraria: number;
  categoria: string;
  nivel?: string;
}

export interface Habilidade {
  nome: string;
  descricao: string;
  categoria: string;
  nivelDificuldade?: string;
}

export interface Matricula {
  cpfUsuario: string;
  nomeCurso: string;
  dataMatricula: string;
  status: string;
  progresso?: number;
}

export interface Recomendacao {
  id?: number;
  cpf: string;
  nomeCurso: string;
  motivo: string;
  dataRecomendacao?: string;
}

export interface Pagamento {
  id?: number;
  cpfUsuario: string;
  nomeCurso: string;
  valor: number;
  metodoPagamento: string;
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
