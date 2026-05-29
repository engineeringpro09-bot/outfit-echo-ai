import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl glass px-5 py-3 mx-4 sm:mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-aurora)] glow-cyan">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            MESTRA
          </span>
          <span className="ml-1 rounded-full border border-primary/40 px-2 py-0.5 font-mono text-[10px] text-primary">
            BETA
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="/#features" className="hover:text-foreground transition">Features</a>
          <a href="/#engine" className="hover:text-foreground transition">AI Engine</a>
          <Link to="/studio" className="hover:text-foreground transition">Studio</Link>
        </nav>

        <Link
          to="/studio"
          className="rounded-xl bg-[var(--gradient-aurora)] px-4 py-2 text-sm font-semibold text-primary-foreground glow-cyan transition hover:scale-[1.03]"
        >
          Launch Studio
        </Link>
      </div>
    </header>
  );
}
