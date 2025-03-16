import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const metadata: Metadata = {
  title: "Gerenciamento de Produtos",
  description: "Aplicação para gerenciamento de produtos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
