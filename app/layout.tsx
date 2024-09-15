import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import GlobalStylesProvider from "./providers/GlobalStylesProvider";
import ContextProvider from "./providers/ContextProvider";


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
    return (
       
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
                    <ContextProvider>
                        <GlobalStylesProvider>
                            <Sidebar />
                            {children}
                        </GlobalStylesProvider>
                    </ContextProvider>
                </body>
            </html>
    );
}
