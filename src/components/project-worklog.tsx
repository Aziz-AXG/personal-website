"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ExternalLink,
  Filter,
  GitBranch,
  LockKeyhole,
  Plus,
  RotateCcw,
  SortAsc,
  SortDesc,
} from "lucide-react";

export type Project = {
  id: string;
  name: string;
  description: string;
  summary: string;
  technologies: string[];
  projectType: string;
  complexity: string;
  repoUrl: string;
  website: string | null;
  createdAt: string;
  visibility: string;
  featured: boolean;
  category: string;
};

const filters = ["All", "Node", "Next/React", "Expo/Mobile", "CLI/Utility"];
const pageSize = 5;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function shortSummary(text: string) {
  if (text.length <= 230) return text;
  return `${text.slice(0, 227).trim()}...`;
}

export function ProjectWorklog({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [direction, setDirection] = useState<"desc" | "asc">("desc");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const visibleProjects = useMemo(() => {
    return projects
      .filter((project) => filter === "All" || project.category === filter)
      .sort((a, b) => {
        const diff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return direction === "asc" ? diff : -diff;
      });
  }, [direction, filter, projects]);

  const displayedProjects = visibleProjects.slice(0, visibleCount);
  const remainingCount = Math.max(visibleProjects.length - visibleCount, 0);

  function updateFilter(nextFilter: string) {
    setFilter(nextFilter);
    setVisibleCount(pageSize);
  }

  function toggleDirection() {
    setDirection(direction === "desc" ? "asc" : "desc");
    setVisibleCount(pageSize);
  }

  return (
    <section id="worklog" className="terminal-frame panel-section p-5 sm:p-6">
      <div className="section-head gap-5">
        <div>
          <p className="terminal-command">query ./worklog --time-indexed</p>
          <h2>Project Worklog</h2>
        </div>
        <div className="control-deck">
          <div className="control-row" aria-label="Project filters">
            <Filter size={15} />
            {filters.map((item) => (
              <button
                className={item === filter ? "control active" : "control"}
                key={item}
                onClick={() => updateFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="sort-button"
            onClick={toggleDirection}
            type="button"
          >
            {direction === "desc" ? (
              <SortDesc size={15} />
            ) : (
              <SortAsc size={15} />
            )}
            {direction === "desc" ? "newest" : "oldest"}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {displayedProjects.map((project, index) => {
          const isPublic = project.visibility.trim().toLowerCase() === "public";

          return (
            <article className="project-card" key={project.id}>
              <div className="project-index">
                #{String(index + 1).padStart(2, "0")}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3>{project.name}</h3>
                  {project.featured ? (
                    <span className="chip chip-hot">featured</span>
                  ) : null}
                  <span className="chip">{project.visibility}</span>
                </div>
                <p className="project-meta">
                  <CalendarDays size={14} />
                  {formatDate(project.createdAt)}
                  <span>/</span>
                  {project.projectType}
                </p>
                <p className="project-summary">
                  {shortSummary(project.summary)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span className="tech-chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-actions">
                {isPublic && project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} GitHub`}
                  >
                    <GitBranch size={17} />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-label={`${project.name} private repository`}
                    title="Private repository"
                  >
                    <LockKeyhole size={17} />
                  </button>
                )}
                {project.website ? (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} website`}
                    title="Project website"
                  >
                    <ExternalLink size={17} />
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {remainingCount > 0 ? (
        <div className="load-more-row">
          <button
            className="load-more-button"
            onClick={() => setVisibleCount((count) => count + pageSize)}
            type="button"
          >
            <Plus size={16} />
            load more
            <span>{remainingCount} queued</span>
          </button>
        </div>
      ) : null}

      {visibleProjects.length === 0 ? (
        <div className="empty-state">
          <RotateCcw size={18} />
          No project packets matched this filter.
        </div>
      ) : null}
    </section>
  );
}
