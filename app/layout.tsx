import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider"
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";



const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
})



export const metadata: Metadata = {
  title: "NoteApp",
  description: "NoteApp created by NextJs",
  openGraph: {
    title: "NoteApp",
    description: "NoteApp created by NextJs",
    url: `https://07-routing-nextjs-gamma-two.vercel.app/`,
    images: [
      {url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
        width: 1200,
        height: 630,
        alt: "NoteAppImage"
      }
    ]
  }
};

export default function RootLayout({
  children,modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
       
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
        <Header />
        {children}
        {modal}
        <Footer />
</TanStackProvider>
      </body>
    </html>
  );
}
