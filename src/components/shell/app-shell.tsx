import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

/**
 * Main authenticated shell that wraps every dashboard-style page.
 * Renders the sidebar on lg+ screens and a sticky topbar everywhere.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar />
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
