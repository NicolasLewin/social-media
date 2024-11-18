import type { Metadata } from "next";
import "./globals.css";
import NavItem from "@/components/NavItem";
import { Bell, Home, Mail, PenSquare, Search, Settings, User } from "lucide-react";

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
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen dark:bg-black dark:text-white">
          <div className="flex h-screen">
            <nav className="flex flex-col p-2 md:w-64 w-20 border-r border-gray-200 dark:border-gray-800">
              <div className="p-3">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <NavItem icon={Home} label="Home" />
                <NavItem icon={Search} label="Explore" />
                <NavItem icon={Bell} label="Notifications" />
                <NavItem icon={Mail} label="Messages" />
                <NavItem icon={User} label="Profile" />
                <NavItem icon={Settings} label="Settings" />
              </div>
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 md:p-4">
                <PenSquare className="md:hidden h-6 w-6" />
                <span className="hidden md:inline">Post</span>
              </button>
            </nav>
            <main className="flex-1 border-r border-gray-200 dark:border-gray-800">
              {children}
            </main>
            <aside className="hidden lg:block w-96 p-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-3 mb-4">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="bg-transparent outline-none w-full dark:text-white"
                  />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <h2 className="text-xl font-bold mb-4">Trending</h2>
              </div>
            </aside>
          </div>
        </div>
      </body>
    </html>
  );
}
