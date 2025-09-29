"use client";
import { useEffect, useState } from "react";
import styles from "./exercicios.module.css";
import { deleteExercise, fetchExercises } from "@/services/api";
import ExerciseForm from "@/components/Form/Exercicio/ExercicioForm";

interface Exercise {
  id: number;
  nome: string;
  descricao: string;
  musculo:string;
}

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchExercises()
      .then((data) => setExercises(data.exercicios)) // ajuste de acordo com o retorno da API
      .catch((err) => console.error("Error fetching exercises:", err))
      .finally(() => setLoading(false));
  }, []);

  const loadExercises = () => {
  setLoading(true);
  fetchExercises()
    .then((data) => setExercises(data.exercicios))
    .catch((err) => console.error("Error fetching exercises:", err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este exercício?")) return;
    try {
      await deleteExercise(id); // função que você cria no api.ts
      loadExercises(); // atualiza a lista
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
   <div className={styles.content}>
    {/* Formulário */}
    <div className={styles.formWrapper}>
      <ExerciseForm onExerciseAdded={loadExercises} />
    </div>

    {/* Grid de cards */}
    <div className={styles.cardsContainer}>
      {exercises.length > 0 ? (
        exercises.map((ex) => (
          <div key={ex.id} className={styles.card}>
            <h3>{ex.nome}</h3>
            <p><strong>Id:</strong>{ex.id}</p>
            <p><strong>Grupo Muscular:</strong> {ex.musculo}</p>
            <p><strong>Descrição:</strong> {ex.descricao}</p>
            <div className={styles.cardActions}>
              <button className={styles.excluir} onClick={() => handleDelete(ex.id)}>Excluir</button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noData}>Nenhum exercício cadastrado.</p>
      )}
    </div>
  </div>

  );
}
