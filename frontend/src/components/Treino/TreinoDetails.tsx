"use client";

import SerieForm from "../Form/Serie/SerieForm";
import SerieList from "../Serie/SerieList/SerieList";
import styles from "./treinodetails.module.css";
import { useState } from "react";

/* === Tipos locais para evitar conflito === */
type SerieBackend = {
  id: number;
  exercicio: {
    id: number;
    nome: string;
    descricao: string;
    musculo: string;
  };
  repeticoes: number;
  carga: number;
};

type TreinoBackend = {
  id: number;
  dataCriacao: string;
  series: SerieBackend[];
};

interface TreinoDetailsProps {
  treino: TreinoBackend;
  onClose: () => void;
  onUpdateSerie: (serie: SerieBackend) => void;
  onDeleteSerie: (serieId: number) => void;
  onAddSerie: (novaSerie: SerieBackend) => void;
}

export default function TreinoDetails({
  treino,
  onClose,
  onUpdateSerie,
  onDeleteSerie,
  onAddSerie,
}: TreinoDetailsProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.header}>
        <h2>Detalhes do Treino #{treino.id}</h2>
        <p>
          <strong>Criado em:</strong>{" "}
          {new Date(treino.dataCriacao).toLocaleDateString()}
        </p>
        <button className={styles.closeBtn} onClick={onClose}>
          Fechar
        </button>
      </div>

      {/* Lista de séries */}
      <h3>Séries</h3>
      {treino.series.length > 0 ? (
        <SerieList
          series={treino.series}
          onEdit={(id) => {
            const serie = treino.series.find((s) => s.id === id);
            if (serie) onUpdateSerie(serie);
          }}
          onDelete={onDeleteSerie}
        />
      ) : (
        <p className={styles.noData}>Nenhuma série cadastrada.</p>
      )}

      {/* Form para adicionar nova série */}
      <div className={styles.addSerie}>
        {showForm ? (
          <SerieForm
            treinoId={treino.id}
            onSubmit={(novaSerie: SerieBackend) => {
              onAddSerie(novaSerie);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <button
            className={styles.addBtn}
            onClick={() => setShowForm(true)}
          >
            + Adicionar Série
          </button>
        )}
      </div>
    </div>
  );
}
