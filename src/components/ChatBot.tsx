"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { getBotResponse, IDLE } from "@/lib/chatbot";
import type { IntentState, Message } from "@/types/chat";

const TYPING_DELAY_MS = 2000;
const WELCOME_MESSAGE =
  "Welcome to North Star Support Bot! How can I help you today?";

function UserAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-md ring-2 ring-white">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-white"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path
          d="M5 20c0-4 3.5-7 7-7s7 3 7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function AgentAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  return (
    <div
      className={`${dim} relative shrink-0 overflow-hidden rounded-full shadow-md ring-2 ring-white`}
    >
      <Image
        src="/avatars/agent.svg"
        alt="Jordan, support agent"
        fill
        className="object-cover"
      />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="mb-4 flex items-end gap-2.5">
      <AgentAvatar />
      <div className="rounded-2xl rounded-bl-md border border-emerald-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isBot = msg.sender === "bot";

  return (
    <div
      className={`mb-4 flex items-end gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && <AgentAvatar />}
      <div className={`max-w-[75%] ${isBot ? "" : "order-first"}`}>
        {isBot && (
          <p className="mb-1 ml-1 text-xs font-medium text-emerald-800/70">
            Jordan
          </p>
        )}
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isBot
              ? "rounded-2xl rounded-bl-md border border-emerald-100 bg-white text-slate-700 shadow-sm"
              : "rounded-2xl rounded-br-md bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-md"
          }`}
        >
          {msg.text}
        </div>
      </div>
      {!isBot && <UserAvatar />}
    </div>
  );
}

export default function ChatBot() {
  const [intentState, setIntentState] = useState<IntentState>(IDLE);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const result = getBotResponse(trimmed, intentState);

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: result.message }]);
      setIntentState(result.nextIntent);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-2xl shadow-emerald-900/10 backdrop-blur-sm">
      <header className="relative overflow-hidden border-b border-emerald-100 bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-600 px-5 py-4">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 right-12 h-16 w-16 rounded-full bg-white/5" />
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <AgentAvatar size="md" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-emerald-700 bg-lime-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold tracking-tight text-white">
              North Star Support Bot
            </h1>
            <p className="text-sm text-emerald-100">
              Jordan · Outdoor gear specialist
            </p>
          </div>
          <div className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-emerald-50">
            Online
          </div>
        </div>
      </header>

      <div
        ref={chatContainerRef}
        className="chat-pattern flex h-[24rem] flex-col overflow-y-auto px-4 py-5"
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-emerald-100 bg-gradient-to-b from-slate-50 to-white px-4 py-3">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder={
              isTyping
                ? "Jordan is typing..."
                : "Ask about orders, gear, returns..."
            }
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-md transition-all hover:from-emerald-500 hover:to-green-600 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:from-emerald-300 disabled:to-green-400 disabled:shadow-none"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400">
          Type &ldquo;talk to a human&rdquo; anytime to reach a live agent
        </p>
      </div>
    </div>
  );
}
