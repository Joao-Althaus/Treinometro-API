"use client";

import SerieCard from "../SerieCards/SerieCards";
import  "./serielist.css";

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

interface SerieListProps {
  series: Serie[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function SerieList({ series, onEdit, onDelete }: SerieListProps) {
  return (
    <div className="list">
      {series.map((serie) => (
        <SerieCard
          key={serie.id}
          id={serie.id}
          exercicio={serie.exercicio} // agora é objeto
          repeticoes={serie.repeticoes}
          carga={serie.carga}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
