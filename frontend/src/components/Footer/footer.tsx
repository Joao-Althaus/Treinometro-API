import "./footer.css"
import Image from 'next/image';

export default function Footer(){
    return (
        <footer className="footer">
        <div className="footer-container">
            <p>
            Desenvolvido para a matéria <strong>Desenvolvimento Web/Mobile</strong> - <strong>Universidade de Passo Fundo (UPF)</strong>, 2025.
            </p>
            <p>
            <a
                href="https://github.com/Joao-Althaus/Treinometro-API"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
            >
                Repositório do projeto
                <Image 
                src="/github.png" alt="GitHub" width={20} height={20}className="github-icon"
                />
            </a>
            </p>
        </div>
        </footer>
  )
}