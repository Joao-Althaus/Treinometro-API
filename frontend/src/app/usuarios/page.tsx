"use client";
import UsuarioForm from "../../components/Form/Usuario/UsuarioForm"
import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "@/services/api";
import styles from "./usuarios.module.css";

interface User {
  id: number;
  nome: string;
  email: string;
  peso: string;
  altura: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

   const loadUsers = () => {
    setLoading(true);
    fetchUsers()
      .then((data) => setUsers(data.Usuarios || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await deleteUser(id); // chama o endpoint DELETE
      loadUsers();           // recarrega os usuários
    } catch (err) {
      console.error(err);
    }
};

  if (loading) return <p className={styles.loading}>Loading users...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuários</h1>

      <div className={styles.content}>
        {/* Formulário */}
        <UsuarioForm onUserAdded={loadUsers} />

        {/* Tabela */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Altura</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.altura}</td>
                <td>{u.peso} <button className={styles.excluir} onClick={() => handleDelete(u.id)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
