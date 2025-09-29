const API_BASE = "http://localhost:3001"; // seu backend rodando em Node

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/api/usuarios`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function createUser(user: { nome: string; email: string; altura: number; peso: number; }) {
  const res = await fetch(`${API_BASE}/api/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${API_BASE}/api/usuarios/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return;
}

export async function fetchExercises() {
  const res = await fetch(`${API_BASE}/api/exercicios`);
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return res.json();
}

export async function createExercise(exercicio: {nome:string; descricao:string; musculo:string}){
  const res = await fetch(`${API_BASE}/api/exercicios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exercicio),
  });
  if (!res.ok) throw new Error("Failed to create exercise");
  return res.json();
}

export async function deleteExercise(id:number){
  const res = await fetch(`${API_BASE}/api/exercicios/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete exercise");
  return;
}

export async function fetchTrainings() {
  const res = await fetch(`${API_BASE}/api/treinos`);
  if (!res.ok) throw new Error("Failed to fetch trainings");
  return res.json();
}
