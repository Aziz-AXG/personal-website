import { Terminal } from "lucide-react";

export function Header() {
  return (
    <nav className="terminal-frame nav-frame flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <a className="nav-brand" href="#boot" aria-label="Back to boot">
        <Terminal size={18} />
        <span>AXG://PORTFOLIO</span>
      </a>
      <div className="flex gap-2 overflow-x-auto text-xs uppercase tracking-[0.18em]">
        {["boot", "stack", "worklog", "contact"].map((section) => (
          <a className="nav-link" href={`#${section}`} key={section}>
            /{section}
          </a>
        ))}
      </div>
    </nav>
  );
}
