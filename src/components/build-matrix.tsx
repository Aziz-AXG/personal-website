import { Cpu, Server, Layout, Smartphone, Bot } from "lucide-react";

const skillNotes = [
  {
    title: "Backend Systems",
    detail: "High-performance services, CLI utilities, and API architectures.",
    level: "92%",
    status: "SYS_OPTIMIZED",
    icon: Server,
    techs: ["Node.js", "Bun", "Express", "Hono", "REST/GraphQL", "Stress Tests"],
  },
  {
    title: "Web Interfaces",
    detail: "Modern, responsive frontend dashboards and commerce workflows.",
    level: "88%",
    status: "SYS_STABLE",
    icon: Layout,
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "State Mgmt"],
  },
  {
    title: "Mobile Builds",
    detail: "Cross-platform mobile apps with seamless localizations and routing.",
    level: "81%",
    status: "SYS_ACTIVE",
    icon: Smartphone,
    techs: ["Expo", "React Native", "Expo Router", "React Query", "i18n"],
  },
  {
    title: "Automation",
    detail: "Custom web scrapers, automated workflows, and browser engines.",
    level: "85%",
    status: "SYS_STANDBY",
    icon: Bot,
    techs: ["Puppeteer", "GitHub Actions", "Shell Scripting", "Data Parsers"],
  },
];

export function BuildMatrix() {
  return (
    <section
      id="stack"
      className="terminal-frame panel-section stack-panel flex h-full flex-col p-5 sm:p-6"
    >
      <div className="section-head">
        <div>
          <p className="terminal-command">scan --stack --priority</p>
          <h2>Specialized Build Matrix</h2>
        </div>
        <Cpu className="text-[var(--neon-cyan)]" size={26} />
      </div>
      <div className="stack-grid mt-5 grid flex-1 gap-3 md:grid-cols-2">
        {skillNotes.map((skill) => {
          const Icon = skill.icon;
          return (
            <article className="skill-card flex flex-col justify-between" key={skill.title}>
              <div>
                <div className="flex items-center justify-between border-b border-[var(--line-dim)] pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[var(--neon-yellow)]" />
                    <h3 className="text-sm font-bold tracking-wider">{skill.title}</h3>
                  </div>
                  <span className="text-[var(--neon-cyan)] font-mono text-xs">{skill.level}</span>
                </div>
                
                <p className="text-xs text-[var(--text-soft)] leading-relaxed mb-4">
                  {skill.detail}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {skill.techs.map((tech) => (
                    <span 
                      key={tech} 
                      className="tech-chip border-dashed text-[9px] py-1 px-2 min-h-0"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[var(--muted)] mb-1">
                  <span>STATUS: {skill.status}</span>
                  <span>LOAD MATRIX</span>
                </div>
                <div className="meter" aria-hidden="true">
                  <span style={{ width: skill.level }} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
