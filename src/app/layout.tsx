import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntDesignConfig from "@/provider/ant-config";
import ReactQueryProvder from "@/provider/react-query";
import Toast from "@/provider/react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Trang chủ"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReactQueryProvder>
                    <AntDesignConfig>
                        <main>{children}</main>
                    </AntDesignConfig>
                    <Toast />
                </ReactQueryProvder>
            </body>
        </html>
    );
}
