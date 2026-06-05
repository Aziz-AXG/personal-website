import {
  Code2,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import profile from "@/data/profile.json";

const visibleSocials = profile.socials.filter((social) => social.url);
const phoneContacts = [
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phone ? `tel:${profile.phone.replace(/\s+/g, "")}` : "",
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: profile.whatsapp,
    href: profile.whatsappLink || "",
    icon: MessageCircle,
    target: "_blank",
    rel: "noopener noreferrer",
  },
].filter((item) => item.value && item.href);

export function Footer() {
  return (
    <>
      <section
        id="contact"
        className="terminal-frame contact-grid grid gap-4 p-5 sm:p-6 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div>
          <p className="terminal-command">connect --public</p>
          <h2 className="contact-title">Open Channel</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-soft)]">
            {profile.availability}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <a className="contact-link" href={`mailto:${profile.email}`}>
            <Mail size={18} />
            <span>{profile.email}</span>
          </a>
          <a
            className="contact-link"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitBranch size={18} />
            <span>{profile.handle}</span>
          </a>
          <span className="contact-link">
            <MapPin size={18} />
            <span>{profile.location}</span>
          </span>
          {visibleSocials
            .filter((social) => !["GitHub", "Website"].includes(social.label))
            .map((social) => (
              <a
                className="contact-link"
                href={social.url}
                key={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={18} />
                <span>{social.label}</span>
              </a>
            ))}
          {phoneContacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                className="contact-link"
                href={contact.href}
                key={contact.label}
                target={contact.target}
                rel={contact.rel}
              >
                <Icon size={18} />
                <span>
                  {contact.label}: {contact.value}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        <span>AXG SYSTEM INTERFACE</span>
        <span className="inline-flex items-center gap-2">
          <Code2 size={14} />
          Next.js / TypeScript / Tailwind
        </span>
      </footer>
    </>
  );
}
