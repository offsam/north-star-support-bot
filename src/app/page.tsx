import ChatBot from "@/components/ChatBot";

export default function Home() {
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
          <ChatBot />
        </div>
      </section>
    </main>
  );
}
