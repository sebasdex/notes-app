import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";
import SideBar from "@/components/SideBar";
import { NoteAppProvider } from "@/context/ContextNoteApp";
import { redirect } from 'next/navigation'
import { createClient } from '@/config/supabaseServer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Note App",
  description: "A simple note app built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid-area-container">
          <Nav />
          <SideBar />
          <main className="main">
            <NoteAppProvider>{children}</NoteAppProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
