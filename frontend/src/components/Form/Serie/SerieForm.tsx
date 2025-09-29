"use client";
import { useState, useEffect } from "react";
import { fetchExercises, createSerie, updateSerie } from "@/services/api";
import "./serieform.modules.css";
import { Exercicio, Serie } from "@/types/types";

interface SerieFormProps {
  treinoId: number;
  serie?: Serie | null; // Para edição (opcional)
  onSubmit: (novaSerie: Serie) => void;
  onCancel: () => void;
}

export default function SerieForm({ treinoId, serie, onSubmit, onCancel }: SerieFormProps) {
  const [carga, setCarga] = useState(0);
  const [repeticoes, setRepeticoes] = useState(0);
  const [exercicioId, setExercicioId] = useState<number | null>(null);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Preenche o formulário se estiver editando
  useEffect(() => {
    if (serie) {
      setCarga(serie.carga);
      setRepeticoes(serie.repeticoes);
      setExercicioId(serie.exercicio.id);
    }
  }, [serie]);

  useEffect(() => {
    fetchExercises()
      .then((data) => {
        // Ajuste conforme o retorno real da sua API
        if (Array.isArray(data)) {
          setExercicios(data);
        } else if (data && Array.isArray(data.exercicios)) {
          setExercicios(data.exercicios);
        } else if (data && Array.isArray(data.data)) {
          setExercicios(data.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar exercícios:", err);
        setError("Erro ao carregar exercícios");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  if (exercicioId === null) {
    setError("Selecione um exercício");
    setLoading(false);
    return;
  }

  try {
    const serieData = {
      treinoId: treinoId,
      exercicioId: exercicioId,
      carga,
      repeticoes,
    };

    console.log("🔍 DEBUG SERIE FORM:");
    console.log("Modo:", serie ? "EDIÇÃO" : "CRIAÇÃO");
    console.log("Treino ID:", treinoId);
    console.log("Série ID:", serie?.id);
    console.log("Dados:", serieData);

    let novaSerie: Serie;

    if (serie) {
      // Editar série existente
      console.log(`📤 PUT para: /api/series/${serie.id}`);
      const updatedSerie = await updateSerie(serie.id, serieData);
      console.log("✅ Série atualizada:", updatedSerie);
      novaSerie = updatedSerie;
    } else {
      // Criar nova série
      console.log("📤 POST para: /api/series");
      const createdSerie = await createSerie(serieData);
      novaSerie = createdSerie;
    }

    onSubmit(novaSerie);

    if (!serie) {
      setCarga(0);
      setRepeticoes(0);
      setExercicioId(null);
    }
  } catch (err: any) {
    console.error("❌ Erro ao salvar série:", err);
    setError(`Erro ao salvar série: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <form className="formSerie" onSubmit={handleSubmit}>
      <h3>{serie ? "Editar Série" : "Nova Série"}</h3>
      
      {error && <div className="error">{error}</div>}

      <label>Exercício:</label>
      <select
        value={exercicioId ?? ""}
        onChange={(e) => setExercicioId(Number(e.target.value))}
        required
        disabled={loading}
      >
        <option value="" disabled>
          Selecione um exercício
        </option>
        {exercicios.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.nome} ({ex.musculo})
          </option>
        ))}
      </select>

      <label>Carga (kg):</label>
      <input
        type="number"
        value={carga}
        onChange={(e) => setCarga(Number(e.target.value))}
        required
        min={0}
        step="0.5"
        disabled={loading}
      />

      <label>Repetições:</label>
      <input
        type="number"
        value={repeticoes}
        onChange={(e) => setRepeticoes(Number(e.target.value))}
        required
        min={1}
        disabled={loading}
      />

      <div className="buttons">
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : (serie ? "Atualizar" : "Salvar")}
        </button>
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  );
}