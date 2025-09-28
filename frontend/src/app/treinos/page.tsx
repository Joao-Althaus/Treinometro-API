"use client";

import { useEffect, useState } from "react";
import { fetchTrainings } from "@/services/api";
import styles from "./treinos.module.css";

interface Training {
  id: number;
  title: string;
  description: string;
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings()
      .then((data) => setTrainings(data))
      .catch((err) => console.error("Error fetching trainings:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.loading}>Loading trainings...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Treinos</h1>
      <ul className={styles.list}>
        {trainings.map((t) => (
          <li key={t.id} className={styles.card}>
            <h2>{t.title}</h2>
            <p>{t.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
