import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import GlobalStylesProvider from "./providers/GlobalStylesProvider";
import ContextProvider from "./providers/ContextProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import NextTopLoader from "nextjs-toploader";

const nunito = Nunito({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Zenit",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = auth();
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    />
                </head>
                <body className={nunito.className}>
                    <NextTopLoader
                        height={4}
                        color="blue"
                        easing="cubic-bezier(0.53,0.21,0,1)"
                        showSpinner={false}
                    />
                    <ContextProvider>
                        <GlobalStylesProvider>
                            {userId && <Sidebar />}
                            {children}
                        </GlobalStylesProvider>
                    </ContextProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
