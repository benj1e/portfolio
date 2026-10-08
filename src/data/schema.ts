import { z } from 'zod';

export const Project = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  featured: z.boolean().default(false),
  stack: z.array(z.string()),
  metrics: z.array(z.string()).default([]),
  media: z.string().optional(), // file in public/proj_img, e.g. "/proj_img/soir.webm"
  links: z.object({ demo: z.string().optional(), repo: z.string().optional() }).default({}),
  caseStudy: z
    .object({
      problem: z.string(),
      decision: z.string(),
      broke: z.string(),
      result: z.string(),
    })
    .partial()
    .optional(),
});

export const Profile = z.object({
  name: z.string(),
  handle: z.string(),
  tagline: z.string(),
  location: z.string(),
  bootLines: z.array(z.string()),
  email: z.string(),
  github: z.string(),
  linkedin: z.string(),
  resumeUrl: z.string(),
});

export const Now = z.object({
  updated: z.string(),
  items: z.array(z.string()),
});

export const LogEntry = z.object({ date: z.string(), text: z.string() });
export const Research = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.string(),
  tags: z.array(z.string()),
});
export const TrackedLinks = z.record(z.string(), z.object({ label: z.string() }));

export const SiteSchema = z
  .object({
    profile: Profile,
    now: Now,
    projects: z.array(Project),
    log: z.array(LogEntry),
    research: z.array(Research),
  })
  .partial();

export type Project = z.infer<typeof Project>;
export type Profile = z.infer<typeof Profile>;
export type SiteData = Required<z.infer<typeof SiteSchema>>;
