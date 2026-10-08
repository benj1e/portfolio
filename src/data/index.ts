import { z } from 'zod';
import { Profile, Project, LogEntry, Research, Now, TrackedLinks, type SiteData } from './schema';
import profileJson from './profile.json';
import nowJson from './now.json';
import projectsJson from './projects.json';
import logJson from './log.json';
import researchJson from './research.json';
import linksJson from './links.json';

// Parsed at load: a bad edit fails the build instead of shipping a broken site.
export const profile = Profile.parse(profileJson);
export const now = Now.parse(nowJson);
export const projects = z.array(Project).parse(projectsJson);
export const log = z.array(LogEntry).parse(logJson);
export const research = z.array(Research).parse(researchJson);
export const trackedLinks = TrackedLinks.parse(linksJson);

export const siteData: SiteData = { profile, now, projects, log, research };
