import { RadioTower } from "lucide-react";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import { type Project } from "./project-worklog";

export function SignalOnline() {
  const featuredProjects = (projects as Project[]).filter(
    (project) => project.featured,
  ).length;

  const signalStats = [
    { label: "repos indexed", value: projects.length.toString() },
    { label: "core stack", value: "node / next / expo" },
    { label: "zone", value: profile.location },
  ];

  return (
    <section
      id="boot"
      className="terminal-frame hero-console relative flex h-full flex-col justify-between p-5 sm:p-7"
    >
      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="status-pill">
            <RadioTower size={15} />
            signal online
          </div>
          <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            Baghdad / UTC+03
          </span>
        </div>

        <p className="terminal-command">run ./introduce --handle</p>
        <h1 className="hero-title">{profile.name}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text-soft)]">
          {profile.headline}
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {signalStats.map((stat) => (
            <div className="data-cell" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-5">
        <div className="boot-lines" aria-label="terminal boot log">
          {profile.statusLines.map((line, index) => (
            <p style={{ animationDelay: `${index * 120}ms` }} key={line}>
              <span>[0{index + 1}]</span> {line}
            </p>
          ))}
          <p style={{ animationDelay: "420ms" }}>
            <span>[04]</span> {featuredProjects} priority projects flagged
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.specialties.map((item) => (
            <span className="chip chip-hot" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
