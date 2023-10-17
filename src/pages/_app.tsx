import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

import { UserGalleyProvider } from "@/contexts/UserGalleyContext";

import { Inter } from "next/font/google";

const inter = Inter({
  weight: "500",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <AuthProvider>
      <SessionProvider session={session}>
        <main className={inter.className} id="main-body">
          <ThemeProvider>
            <UserGalleyProvider>
              <Component {...pageProps} />
            </UserGalleyProvider>
          </ThemeProvider>
        </main>
      </SessionProvider>
    </AuthProvider>
  );
}
