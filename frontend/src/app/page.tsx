import Navbar from "@/components/Navbar/navbar"
import "./globals.css"
import Footer from "@/components/Footer/footer";


export default function Home() {
  return (
    <div className="container">
        <Navbar/>
        <h1>Treinometro</h1>

        <p>Sua API para monitorar sua evolução dos seus treinos.</p>

        
    </div>
  );
}
