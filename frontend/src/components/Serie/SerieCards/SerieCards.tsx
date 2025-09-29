"use client";

import "../SerieCards/seriecards.css";

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
      <h4>{exercicio.nome}</h4> {/* exibindo o nome do exercício */}
      <p>
        <strong>Carga:</strong> {carga} kg
      </p>
      <p>
        <strong>Repetições:</strong> {repeticoes}
      </p>
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
