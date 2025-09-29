"use client";

import { useEffect, useState } from "react";
import { createTreino, deleteTreino, fetchTrainings } from "@/services/api";
import styles from "./treinos.module.css";
import SerieForm from "@/components/Form/Serie/SerieForm";
import SerieList from "@/components/Serie/SerieList/SerieList";
import { Exercicio, Serie, Treino } from "@/types/types";

// Extendendo a interface Treino para incluir a propriedade showDetalhes
interface TreinoComDetalhes extends Treino {
  showDetalhes?: boolean;
}

export default function TrainingsPage() {
  const [loading, setLoading] = useState(true);
  const [treinos, setTreinos] = useState<TreinoComDetalhes[]>([]);
  const [serieSelecionada, setSerieSelecionada] = useState<Serie | null>(null);
  const [treinoAtual, setTreinoAtual] = useState<Treino | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    fetchTrainings()
      .then((response) => {
        // A API retorna { data: [], total: number, page: number, lastPage: number }
        if (response && Array.isArray(response.data)) {
          setTreinos(response.data);
          // Se houver treinos, pega o usuarioId do primeiro treino
          if (response.data.length > 0) {
            setUsuarioId(response.data[0].usuario.id);
          }
        } else {
          console.warn("Formato de resposta inesperado:", response);
          setTreinos([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar treinos:", err);
        setError("Erro ao carregar treinos");
        setTreinos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleToggleDetalhes = (id: number) => {
    setTreinos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, showDetalhes: !t.showDetalhes } : t
      )
    );
  };

  const handleDeleteTreino = async (id: number) => {
    if (!confirm("Deseja realmente excluir este treino?")) return;
    
    try {
      // Chama a API para deletar no backend
      await deleteTreino(id);
      
      // Atualiza o estado local apenas se a API for bem-sucedida
      setTreinos((prev) => prev.filter((t) => t.id !== id));
      
    } catch (err) {
      console.error("Erro ao excluir treino:", err);
      alert("Erro ao excluir treino. Tente novamente.");
    }
  };

  const handleEditSerie = (serie: Serie, treino: Treino) => {
    setSerieSelecionada(serie);
    setTreinoAtual(treino);
  };

  const handleDeleteSerie = (serieId: number, treinoId: number) => {
    setTreinos((prev) =>
      prev.map((t) =>
        t.id === treinoId
          ? { ...t, series: t.series.filter((s) => s.id !== serieId) }
          : t
      )
    );
  };

  const handleSaveSerie = (novaSerie: Serie) => {
    if (!treinoAtual) return;
    
    setTreinos((prev) =>
      prev.map((t) =>
        t.id === treinoAtual.id
          ? {
              ...t,
              series: t.series.map((s) =>
                s.id === novaSerie.id ? novaSerie : s
              ),
            }
          : t
      )
    );
    setSerieSelecionada(null);
    setTreinoAtual(null);
  };

  const handleCreateTreino = async () => {
    
    const userIdToUse = usuarioId || 14; 
    
    try {
      const novoTreino = await createTreino(userIdToUse);
      // Adiciona showDetalhes: true para o novo treino
      setTreinos(prev => [{ ...novoTreino, showDetalhes: true }, ...prev]);
    } catch (err) {
      console.error("Erro ao criar treino:", err);
      alert("Erro ao criar treino. Verifique se o usuário existe.");
    }
  };

  const handleAddSerie = (treino: Treino) => {
    setTreinoAtual(treino);
    setSerieSelecionada(null); // null = modo criação
  };

  if (loading) return <p className={styles.loading}>Carregando treinos...</p>;
  
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Treinos</h1>

      {/* Botão para criar novo treino */}
      <div className={styles.headerActions}>
        <button 
          className={styles.addButton}
          onClick={handleCreateTreino}
        >
          + Novo Treino
        </button>
        {!usuarioId && (
          <p className={styles.warning}>Usando usuário padrão para criar treinos</p>
        )}
      </div>

      <div className={styles.treinosGrid}>
        {treinos.length === 0 ? (
          <p className={styles.noData}>Nenhum treino encontrado.</p>
        ) : (
          treinos.map((treino) => (
            <div key={treino.id} className={styles.card}>
              <h3>Treino #{treino.id}</h3>
              <p><strong>Criado em:</strong> {new Date(treino.dataCriacao).toLocaleDateString()}</p>
              <p><strong>Usuário:</strong> {treino.usuario.nome}</p>

              <div className={styles.cardActions}>
                <button onClick={() => handleDeleteTreino(treino.id)}>Excluir</button>
                <button onClick={() => handleToggleDetalhes(treino.id)}>
                  {treino.showDetalhes ? "Ocultar detalhes" : "Ver detalhes"}
                </button>
              </div>

              {treino.showDetalhes && (
                <div className={styles.seriesContainer}>
                  {/* Header com botão de nova série */}
                  <div className={styles.seriesHeader}>
                    <h4>Séries</h4>
                    <button 
                      className={styles.addSerieButton}
                      onClick={() => handleAddSerie(treino)}
                    >
                      + Nova Série
                    </button>
                  </div>
                  
                  <SerieList
                    series={treino.series}
                    onEdit={(serieId) => {
                      const serie = treino.series.find((s) => s.id === serieId);
                      if (serie) handleEditSerie(serie, treino);
                    }}
                    onDelete={(serieId) => handleDeleteSerie(serieId, treino.id)}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal do SerieForm - funciona para criação E edição */}
      {(serieSelecionada !== null || treinoAtual !== null) && (
        <SerieForm
          treinoId={treinoAtual?.id || 0}
          serie={serieSelecionada} // null = modo criação, objeto = modo edição
          onSubmit={handleSaveSerie}
          onCancel={() => {
            setSerieSelecionada(null);
            setTreinoAtual(null);
          }}
        />
      )}
    </div>
  );
}