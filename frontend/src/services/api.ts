const API_BASE = "http://localhost:3001"; // seu backend rodando em Node

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/api/usuarios`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchExercises() {
  const res = await fetch(`${API_BASE}/api/exercicios`);
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return res.json();
}

export async function fetchTrainings() {
  const res = await fetch(`${API_BASE}/api/treinos`);
  if (!res.ok) throw new Error("Failed to fetch trainings");
  return res.json();
}
