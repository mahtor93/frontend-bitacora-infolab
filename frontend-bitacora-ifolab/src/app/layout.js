import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserRoleProvider } from "./components/context/user.context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bitácora Lab. de Computación",
  description: "Bitácora para el laboratorio de computación del Instituto Profesional Virginio Gómez",
  icons: '/favicon.ico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <UserRoleProvider>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
      </UserRoleProvider>
    </html>
  );
}
