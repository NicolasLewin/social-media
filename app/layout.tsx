import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SessionProvider from "@/providers/SessionProvider";
import AuthWrapper from "@/components/AuthWrapper";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Social Media",
  description: "Speak and follow your friends!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SessionProvider>
            <AuthWrapper>
              <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white">
                <Sidebar>{children}</Sidebar>
              </div>
            </AuthWrapper>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
