"use client";

import TreinoCard from "../Treino/TreinoCard";
import styles from "../TreinoCard/treinocard.module.css";

interface Exercício {
  id: number;
  nome: string;
  descricao: string;
  musculo: string;
}

interface Serie {
  id: number;
  exercicio: Exercício; 
  repeticoes: number;
  carga: number;
}

interface Treino {
  id: number;
  dataCriacao: string;
  series: Serie[];
}

interface TreinoListProps {
  treinos: Treino[];
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export default function TreinoList({ treinos, onDelete, onViewDetails }: TreinoListProps) {
  return (
    <div className={styles.list}>
      {treinos.map((treino) => (
        <TreinoCard
          key={treino.id}
          treino={treino}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
