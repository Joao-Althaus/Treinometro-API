const API_BASE = "http://localhost:3000"; // seu backend rodando em Node

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/usuarios`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchExercises() {
  const res = await fetch(`${API_BASE}/exercicios`);
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return res.json();
}

export async function fetchTrainings() {
  const res = await fetch(`${API_BASE}/treinos`);
  if (!res.ok) throw new Error("Failed to fetch trainings");
  return res.json();
}
