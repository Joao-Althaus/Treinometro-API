import "./globals.css"
import Link from "next/link";


export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)", // ocupa a tela inteira menos a navbar
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111827", // fundo cinza escuro
        color: "#f3f4f6",           // texto claro
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Treinômetro
      </h1>

      <p style={{ fontSize: "1.3rem", marginBottom: "2rem", maxWidth: "600px" }}>
        Acompanhe, organize e evolua seus <strong>treinos</strong> de forma
        simples e eficiente 🚀
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link
          href="/usuarios"
          style={{
            backgroundColor: "#3b82f6", // azul para chamar atenção
            color: "#fff",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
            transition: "background 0.3s ease",
          }}
        >
          LIsta de Usuários
        </Link>

        <Link
          href="/treinos"
          style={{
            backgroundColor: "#1f2937", // cinza escuro mais claro que o fundo
            color: "#f3f4f6",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
            border: "2px solid #3b82f6",
            transition: "all 0.3s ease",
          }}
        >
          Ver Treinos
        </Link>
      </div>
    </div>
  );
}

