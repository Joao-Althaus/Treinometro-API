"use client";

import Link from "next/link";
import "./navbar.css"; 

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-container">
        {}
        <div className="navbar-logo">
          <h2>Treinômetro</h2>
        </div>

        
        <ul className="navbar-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/treinos">Treinos</Link></li>
          <li><Link href="/exercicios">Exercícios</Link></li>
          <li><Link href="/usuarios">Usuários</Link></li>
        </ul>
      </nav>
    </header>
  );
}