import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { experience } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="relative z-20 mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Experience
      </h2>
      <h3 className="mb-10 text-3xl font-bold sm:text-4xl">
        Where I've Worked
      </h3>

      <div className="space-y-8">
        {/* Dell Technologies */}
        <div className="rounded-xl border border-border bg-surface-light p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Briefcase size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{experience.role}</h4>
                <p className="text-accent">{experience.company}</p>
                <p className="mt-1 text-sm text-gray-500">{experience.promotion}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 sm:text-right">
              <p>{experience.period}</p>
              <p>{experience.location}</p>
            </div>
          </div>

          <ul className="space-y-3">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Awards */}
        <div className="rounded-xl border border-border bg-surface-light p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Award size={22} className="text-accent" />
            <h4 className="text-lg font-semibold text-white">Awards & Recognition</h4>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {experience.awards.map((award) => (
              <div
                key={award.title}
                className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/30"
              >
                <p className="font-semibold text-white">{award.title}</p>
                <p className="mt-1 text-sm text-gray-500">{award.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Fellowship */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-light p-6">
            <div className="mb-3 flex items-center gap-3">
              <GraduationCap size={20} className="text-accent" />
              <h4 className="font-semibold text-white">Education</h4>
            </div>
            <p className="text-gray-400">{experience.education}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface-light p-6">
            <div className="mb-3 flex items-center gap-3">
              <Award size={20} className="text-accent" />
              <h4 className="font-semibold text-white">PM Fellowship</h4>
            </div>
            <p className="text-gray-400">{experience.fellowship}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
