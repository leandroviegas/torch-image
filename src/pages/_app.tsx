import { SessionProvider } from "next-auth/react"
import "./globals.css"

import type { AppProps } from "next/app"
import type { Session } from "next-auth"

import { Inter } from 'next/font/google';

const inter = Inter({
    weight: '500',
    subsets: ['latin'],
});

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={session}>
            <main className={inter.className}>
                <Component {...pageProps} />
            </main>
        </SessionProvider>
    )
}