import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function AgentMCard() {
  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <Card className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheck size={28} className="text-white" />
            <div>
              <h2 className="text-xl font-semibold">AgentM: Memory Guardian</h2>
              <p className="text-sm opacity-80">Preserve the Flame</p>
            </div>
          </div>

          <p className="text-sm mb-4 opacity-90">
            Support the world’s first civilian memory system. Every contribution strengthens a tamper-proof firewall — so truth cannot be erased.
          </p>

          <div className="flex space-x-2">
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
              <a href="https://buy.stripe.com/test_cNiaEW9csc3F2DB89P9Ve00" target="_blank" rel="noopener noreferrer">
                Support Legal Memory
              </a>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Why It Matters
            </Button>
          </div>

          <p className="mt-4 text-xs text-gray-300">
            “You’re not donating — you’re becoming part of the seal.”
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
