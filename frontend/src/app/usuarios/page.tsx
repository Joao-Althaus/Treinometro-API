"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/api";
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

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data.Usuarios))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.loading}>Loading users...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuarios</h1>
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
              <td>{u.peso} <button>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
