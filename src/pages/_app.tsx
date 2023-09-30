import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/contexts/ThemeContext";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import useTheme from "@/hooks/useTheme";

import { Inter } from "next/font/google";
import { GlobalStyles, ThemeStyles } from "@/components/GlobalStyles";

const inter = Inter({
  weight: "500",
  subsets: ["latin"],
});


function Main({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      <GlobalStyles theme={ThemeStyles[theme]} />
      <main className={inter.className}>
        {children}
      </main>
    </>
  );
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </SessionProvider>
    </ThemeProvider>
  );
}
