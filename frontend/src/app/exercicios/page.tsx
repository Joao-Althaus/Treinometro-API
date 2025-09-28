"use client";
import { useEffect, useState } from "react";
import styles from "./exercicios.module.css";

interface Serie {
  id: number;
  reps: number;
  weight: number;
}

interface Exercise {
  id: number;
  name: string;
  description: string;
  series?: Serie[];
}

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const res = await fetch("http://localhost:3000/exercicios");
        if (!res.ok) throw new Error("Failed to fetch exercises");
        const data: Exercise[] = await res.json();

        // Fetch series for each exercise
        const exercisesWithSeries = await Promise.all(
          data.map(async (exercise) => {
            const seriesRes = await fetch(
              `http://localhost:3000/series?exercicioId=${exercise.id}`
            );
            const seriesData: Serie[] = seriesRes.ok ? await seriesRes.json() : [];
            return { ...exercise, series: seriesData };
          })
        );

        setExercises(exercisesWithSeries);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExercises();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Exercicios</h1>
      <ul className={styles.list}>
        {exercises.map((exercise) => (
          <li key={exercise.id} className={styles.card}>
            <h2 className={styles.exerciseName}>{exercise.name}</h2>
            <p className={styles.exerciseDescription}>{exercise.description}</p>

            {exercise.series && exercise.series.length > 0 ? (
              <div className={styles.seriesSection}>
                <h3 className={styles.seriesTitle}>Series</h3>
                <ul className={styles.seriesList}>
                  {exercise.series.map((serie) => (
                    <li key={serie.id} className={styles.serieItem}>
                      <span>Reps: {serie.reps}</span> |{" "}
                      <span>Weight: {serie.weight}kg</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className={styles.noSeries}>Não existem series regsitradas</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
