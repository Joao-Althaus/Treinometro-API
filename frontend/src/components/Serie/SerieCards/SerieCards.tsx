"use client";

import   "../SerieCards/seriecards.css";

interface Exercício {
  id: number;
  nome: string;
  descricao: string;
  musculo: string;
}

interface SerieCardProps {
  id: number;
  exercicio: Exercício; // agora é objeto
  repeticoes: number;
  carga: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function SerieCard({
  id,
  exercicio,
  repeticoes,
  carga,
  onEdit,
  onDelete,
}: SerieCardProps) {
  return (
    <div className="card">
      <div className="exerciseHeader">
        <h4 className="exerciseName">{exercicio.nome}</h4>
      </div>
      
      
      <div className="exerciseDetails">
        <div className="detailItem">
          <span className="detailLabel">Carga:</span>
          <span className="detailValue">{carga} kg</span>
        </div>
 
        <div className="detailItem">
          <span className="detailLabel">Repetições:</span>
          <span className="detailValue">{repeticoes}</span>
        </div>
      </div>

      <div className="cardActions">
        <button onClick={() => onEdit(id)} className="editar">
          Editar
        </button>
        <button onClick={() => onDelete(id)} className="excluir">
          Excluir
        </button>
      </div>
    </div>
  );
}
