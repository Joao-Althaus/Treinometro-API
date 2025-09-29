
import { useState } from "react";
import { createExercise } from "@/services/api"; 
import "../Exercicio/style.css"

interface Props {
  onExerciseAdded: () => void; 
}

export default function ExerciseForm({ onExerciseAdded }: Props) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [musculo, setMusculo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createExercise({ nome, descricao, musculo });
      setNome("");
      setDescricao("");
      setMusculo("");
      onExerciseAdded(); 
    } catch (err) {
      console.error("Erro ao criar exercício:", err);
    }
  };

  return (
    <form className="form-exercise" onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Exercício</h3>

      <label>Nome</label>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

      <label>Descrição</label>
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />

      <label>Músculo</label>
      <input type="text" value={musculo} onChange={(e) => setMusculo(e.target.value)} required />

      <button type="submit" className="adicionar">Adicionar</button>
    </form>
  );
}