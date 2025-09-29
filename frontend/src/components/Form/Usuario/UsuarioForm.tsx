import { useState } from "react";
import "./form.modules.css";
import { createUser } from "@/services/api";

interface Props {
  onUserAdded: () => void; 
}

export default function Form({ onUserAdded }: Props) { 
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ nome, email, altura: Number(altura), peso: Number(peso) });
      setNome("");
      setEmail("");
      setAltura("");
      setPeso("");
      onUserAdded(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Usuário</h3>

      <label>Nome</label>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Altura</label>
      <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} required  placeholder="Em metros"/>

      <label>Peso</label>
      <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} required placeholder="Em Kg" />

      <button type="submit" className="adicionar">Adicionar</button>
    </form>
  );
}
