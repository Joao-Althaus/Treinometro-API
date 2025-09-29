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


// Criar nova série
export async function createSerie(serieData: {
  treinoId: number;
  exercicioId: number;
  carga: number;
  repeticoes: number;
}) {
  // Converter de camelCase para underscore para a API
  const bodyParaAPI = {
    exercicio_id: serieData.exercicioId,
    treino_id: serieData.treinoId,
    carga: serieData.carga,
    repeticoes: serieData.repeticoes
  };

  console.log("Enviando para API:", bodyParaAPI);

  const res = await fetch(`${API_BASE}/api/series`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParaAPI),
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create serie: ${res.status} - ${errorText}`);
  }
  
  const response = await res.json();
  return response.serie; // Retorna a série criada
}

export async function updateSerie(serieId: number, serieData: {
  treinoId: number;
  exercicioId: number;
  carga: number;
  repeticoes: number;
}) {
  const res = await fetch(`${API_BASE}/api/series/${serieId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serieData),
  });
  
  if (!res.ok) throw new Error("Failed to update serie");
  
  const response = await res.json();
  // Retorna a série atualizada, não o objeto completo da resposta
  return response.serie;
}

export async function deleteSerie(serieId: number) {
  const url = `${API_BASE}/api/series/${serieId}`;
  
  console.log("Excluindo série:", url);
  
  const res = await fetch(url, {
    method: 'DELETE',
  });
  
  console.log("Status da resposta DELETE série:", res.status);
  
  if (!res.ok && res.status !== 204) {
    const errorText = await res.text();
    throw new Error(`Failed to delete serie: ${res.status} - ${errorText}`);
  }
  
  console.log("Série excluída com sucesso");
}

export async function fetchTrainings() {
  const res = await fetch(`${API_BASE}/api/treinos`);
  if (!res.ok) throw new Error("Failed to fetch trainings");
  return res.json();
}

export async function createTreino(usuarioId: number) {
  const res = await fetch(`${API_BASE}/api/treinos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario_id: usuarioId  // ← Agora enviando o usuario_id no body
    }),
  });
  
  if (!res.ok) throw new Error("Failed to create treino");
  
  const response = await res.json();
  return response.treino; // ou response.data, dependendo da sua API
}

export async function deleteTreino(id: number) {
  const url = `${API_BASE}/api/treinos/${id}`;
  
  console.log("Deletando treino:", url);
  
  const res = await fetch(url, {
    method: 'DELETE',
  });
  
  console.log("Status da resposta DELETE:", res.status);
  
  // Status 204 significa "No Content" - sucesso sem corpo de resposta
  if (!res.ok && res.status !== 204) {
    const errorText = await res.text();
    console.error("Erro ao deletar treino:", errorText);
    throw new Error(`Failed to delete treino: ${res.status} - ${errorText}`);
  }
  
  console.log("Treino deletado com sucesso (204 No Content)");
  // Para status 204, não tentamos ler o JSON da resposta
}