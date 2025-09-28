// app/layout.tsx
import Navbar from "@/components/Navbar/navbar";
import "./globals.css";
import Footer from "@/components/Footer/footer";

export const metadata = {
  title: "Treinometro",
  description: "Workout tracker app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>{children}</main>
        <Footer />   {/* Footer fica aqui, DENTRO do body */}
      </body>
    </html>
  );
}
