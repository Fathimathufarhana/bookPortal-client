import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Header from "@/components/header/Header";
import Providers from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Portal",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider theme={theme}>
            <Providers>
            <Header />
            {children}
            </Providers>
          </ThemeProvider>
        </body>
    </html>
  );
}
