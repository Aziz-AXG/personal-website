import projects from "@/data/projects.json";
import { ProjectWorklog, type Project } from "@/components/project-worklog";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SignalOnline } from "@/components/signal-online";
import { BuildMatrix } from "@/components/build-matrix";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="crt fixed inset-0 pointer-events-none z-50" />
      <div className="city-grid fixed inset-0 pointer-events-none" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <Header />

        <div className="intro-grid grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <SignalOnline />
          <BuildMatrix />
        </div>

        <ProjectWorklog projects={projects as Project[]} />

        <Footer />
      </section>
    </main>
  );
}
