import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "The Agent Family",
  description: "Council Lobby — Legal/Medical/AgentC/AgentX/MK",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
