// components/Form/NovoTreinoForm/NovoTreinoForm.tsx
"use client";
import { useState } from "react";
import "./novotreinoform.css";

interface NovoTreinoFormProps {
  onSubmit: (usuarioId: number) => void;
  onCancel: () => void;
  usuariosDisponiveis: any[]; // Lista de usuários para escolher
}

export default function NovoTreinoForm({ onSubmit, onCancel, usuariosDisponiveis }: NovoTreinoFormProps) {
  const [usuarioId, setUsuarioId] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuarioId) {
      alert("Selecione um usuário");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(Number(usuarioId));
    } catch (error) {
      console.error("Erro ao criar treino:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>Criar Novo Treino</h3>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label htmlFor="usuario">Selecionar Usuário:</label>
            <select
              id="usuario"
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value ? Number(e.target.value) : "")}
              required
              disabled={loading}
            >
              <option value="">Selecione um usuário</option>
              {usuariosDisponiveis.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome} (ID: {usuario.id})
                </option>
              ))}
            </select>
          </div>

          <div className="formActions">
            <button type="submit" disabled={loading} className="submitBtn">
              {loading ? "Criando..." : "Criar Treino"}
            </button>
            <button type="button" onClick={onCancel} disabled={loading} className="cancelBtn">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}