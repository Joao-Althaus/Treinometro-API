// types.tsx

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  peso: string;
  altura: string;
  dataCriacao: string;
}

export interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
  musculo: string;
}

export interface Serie {
  id: number;
  exercicio: Exercicio;
  carga: number;
  repeticoes: number;
  treinoId: number;
}

export interface Treino {
  id: number;
  dataCriacao: string;
  usuario: Usuario; // Agora usando a interface Usuario
  series: Serie[];
}