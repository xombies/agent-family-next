import dynamic from "next/dynamic";
import AuthorshipBadge from "@/components/AuthorshipBadge";

// Avoid SSR issues with window by loading this on client only
const AgentFamilyLobby = dynamic(() => import("@/components/AgentFamilyLobby"), { ssr: false });

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <AgentFamilyLobby />
      <footer className="mt-10">
        <AuthorshipBadge issuedAt="2025-10-17" />
      </footer>
    </main>
  );
}
