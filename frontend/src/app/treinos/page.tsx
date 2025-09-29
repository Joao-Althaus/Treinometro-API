"use client";

import { useEffect, useState } from "react";
import { createTreino, deleteSerie, deleteTreino, fetchTrainings, fetchUsers } from "@/services/api";
import styles from "./treinos.module.css";
import SerieForm from "@/components/Form/Serie/SerieForm";
import SerieList from "@/components/Serie/SerieList/SerieList";

import { Exercicio, Serie, Treino } from "@/types/types";
import NovoTreinoForm from "@/components/Form/Treino/TreinoForm";

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
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [showNovoTreinoForm, setShowNovoTreinoForm] = useState(false);

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

  // Busca de usuários
  fetchUsers()
    .then(data => {
      console.log("Dados retornados da API de usuários:", data);
      
      // Extrai o array de Usuarios do objeto de resposta
      let usuariosArray = [];
      
      if (data && Array.isArray(data.Usuarios)) {
        // Se a resposta tem a propriedade "Usuarios"
        usuariosArray = data.Usuarios;
      } else if (Array.isArray(data)) {
        // Se a resposta já é um array (para outras páginas)
        usuariosArray = data;
      } else {
        console.warn("Formato de resposta inesperado para usuários:", data);
        usuariosArray = [];
      }
      
      console.log("Usuários extraídos:", usuariosArray);
      setUsuarios(usuariosArray);
    })
    .catch(err => {
      console.error("Erro ao buscar usuários:", err);
      setUsuarios([]);
    });
}, []); // ← Fecha o useEffect aqui

// MOVE todas as funções para FORA do useEffect
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

  const handleDeleteSerie = async (serieId: number, treinoId: number) => {
    if (!confirm("Deseja realmente excluir esta série?")) return;
    
    try {
      // Chama a API para excluir permanentemente
      await deleteSerie(serieId);
      
      // Atualiza o estado local apenas se a API for bem-sucedida
      setTreinos((prev) =>
        prev.map((t) =>
          t.id === treinoId
            ? { ...t, series: t.series.filter((s) => s.id !== serieId) }
            : t
        )
      );
      
    } catch (err) {
      console.error("Erro ao excluir série:", err);
      alert("Erro ao excluir série. Tente novamente.");
    }
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

  const handleCreateTreinoComUsuario = async (usuarioId: number) => {
    try {
      const novoTreino = await createTreino(usuarioId);
      setTreinos(prev => [{ ...novoTreino, showDetalhes: true }, ...prev]);
      setShowNovoTreinoForm(false); // Fecha o modal
    } catch (err) {
      console.error("Erro ao criar treino:", err);
      alert("Erro ao criar treino");
      throw err; // Re-throw para o form tratar
    }
  };

  const handleAddSerie = (treino: Treino) => {
    setTreinoAtual(treino);
    setSerieSelecionada(null); // null = modo criação
  };
  
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Treinos</h1>

      {/* Botão para criar novo treino */}
      <div className={styles.headerActions}>
        <button 
          className={styles.addButton}
          onClick={() => setShowNovoTreinoForm(true)}
        >
          + Novo Treino
        </button>
        {!usuarios.length && (
          <p className={styles.warning}>Carregando usuários...</p>
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
                    <h4>Séries: <span className={styles.seriesCount}>{treino.series.length}</span></h4>
                    
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

      {/* Modal para criar novo treino */}
      {showNovoTreinoForm && (
        <NovoTreinoForm
          onSubmit={handleCreateTreinoComUsuario}
          onCancel={() => setShowNovoTreinoForm(false)}
          usuariosDisponiveis={usuarios}
        />
      )}
    </div>
  );
}