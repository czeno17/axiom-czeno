import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  );
}
