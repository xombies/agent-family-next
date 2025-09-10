import dynamic from "next/dynamic";

// Avoid SSR issues with window by loading this on client only
const AgentFamilyLobby = dynamic(() => import("@/components/AgentFamilyLobby"), { ssr: false });

export default function Page() {
  return <AgentFamilyLobby />;
}
