import Link from "next/link";
import { LayoutDashboard, FileText, Image as ImageIcon } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-zinc-50/40 dark:bg-zinc-900/40">
      <div className="flex h-14 items-center border-b px-6">
        <span className="text-lg font-bold tracking-tight">Private Dump</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/notes"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <FileText className="h-5 w-5" />
          Notes
        </Link>
        <Link
          href="/images"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ImageIcon className="h-5 w-5" />
          Images
        </Link>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Personal Vault
        </div>
      </div>
    </div>
  );
}
