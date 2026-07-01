import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Omega CRM | Next.js Hiring Assignment",
  description: "Production-quality Next.js 15 dashboard with JWT auth, Redux Toolkit, Tailwind design system, and a custom data table."
};

const themeInitScript = `
  (() => {
    try {
      const storageKey = "omega-crm-theme";
      const savedTheme = window.localStorage.getItem(storageKey);
      const theme = savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

      document.documentElement.dataset.theme = theme;
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
