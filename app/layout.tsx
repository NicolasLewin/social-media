import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SessionProvider from "@/providers/SessionProvider";
import AuthWrapper from "@/components/AuthWrapper";
import Sidebar from "@/components/Sidebar";
import { Toaster } from 'react-hot-toast';
import { PostsProvider } from "@/providers/PostsProvider";

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
                if (!localStorage.getItem('theme')) {
                  localStorage.setItem('theme', 'dark');
                }
                if (localStorage.getItem('theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body>
        <Toaster />
        <ThemeProvider>
          <SessionProvider>
            <PostsProvider>
              <AuthWrapper>
                <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white">
                  <Sidebar>{children}</Sidebar>
                </div>
              </AuthWrapper>
            </PostsProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}