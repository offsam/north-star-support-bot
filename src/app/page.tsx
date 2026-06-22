"use client";

import { useRef, useState } from "react";
import ChatBot, { type ChatBotHandle } from "@/components/ChatBot";

export default function Home() {
  const chatRef = useRef<ChatBotHandle>(null);
  const [demoActive, setDemoActive] = useState(false);

  function handleDemo() {
    if (demoActive) {
      chatRef.current?.stopDemo();
      setDemoActive(false);
    } else {
      setDemoActive(true);
      void chatRef.current?.runDemo().then(() => setDemoActive(false));
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -right-16 bottom-16 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <p className="mb-3 text-center text-sm font-medium tracking-wide text-emerald-200/80">
            Your trail-ready support team
          </p>
          <ChatBot ref={chatRef} />
          <div className="mt-4 pl-1">
            <button
              onClick={handleDemo}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide shadow-lg transition-all active:scale-95 ${
                demoActive
                  ? "bg-red-600/90 text-white hover:bg-red-500"
                  : "bg-white/10 text-emerald-100 ring-1 ring-white/20 hover:bg-white/20 hover:text-white"
              }`}
            >
              {demoActive ? "Stop demo" : "Run demo"}
            </button>
            <p className="mt-2 text-xs text-emerald-200/50">
              {demoActive
                ? "Auto walkthrough of all scenarios (~2 min)"
                : "Play an automated demo of all chatbot flows"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
