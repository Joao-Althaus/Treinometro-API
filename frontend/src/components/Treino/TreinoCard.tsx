"use client";

import SerieList from "../Serie/SerieList/SerieList";
import styles from "./treino.module.css";

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

interface TreinoCardProps {
  treino: Treino;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export default function TreinoCard({ treino, onDelete, onViewDetails }: TreinoCardProps) {
  return (
    <div className={styles.card}>
      <h3>Treino #{treino.id}</h3>
      <p><strong>Criado em:</strong> {new Date(treino.dataCriacao).toLocaleDateString()}</p>

      {/* Lista de séries */}
      {treino.series && treino.series.length > 0 ? (
        <SerieList
          series={treino.series} // agora compatível
          onEdit={(id) => console.log("Editar série", id)}
          onDelete={(id) => console.log("Excluir série", id)}
        />
      ) : (
        <p className={styles.noData}>Nenhuma série cadastrada</p>
      )}

      <div className={styles.cardActions}>
        <button className={styles.verDetalhes} onClick={() => onViewDetails(treino.id)}>
          Ver Detalhes
        </button>
        <button className={styles.excluir} onClick={() => onDelete(treino.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}

