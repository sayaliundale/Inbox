import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image as ImageIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col gap-8 p-8 max-w-6xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 mt-2">Welcome back to your private space.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/notes" className="block focus:outline-none focus:ring-2 focus:ring-zinc-900 rounded-xl">
          <Card className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer h-full shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Notes</CardTitle>
              <FileText className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-zinc-500">+2 from yesterday</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/images" className="block focus:outline-none focus:ring-2 focus:ring-zinc-900 rounded-xl">
          <Card className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer h-full shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Images</CardTitle>
              <ImageIcon className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-zinc-500">+12 from last week</p>
            </CardContent>
          </Card>
        </Link>

        <div className="block opacity-60">
          <Card className="h-full shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Snippets (Coming Soon)</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-zinc-500">Feature in progress</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4 tracking-tight">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm bg-white dark:bg-zinc-950">
              <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-100 flex items-center justify-center dark:bg-zinc-800">
                <FileText className="h-5 w-5 text-zinc-500" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Modified "Meeting Notes"</p>
                <p className="text-sm text-zinc-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
