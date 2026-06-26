import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

const configuredSite = process.env.ASTRO_SITE?.trim();
const configuredBase = process.env.ASTRO_BASE?.trim();
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const isUserOrOrgPagesRepo = repositoryName?.endsWith('.github.io');

const site =
  configuredSite ||
  (repositoryOwner ? `https://${repositoryOwner}.github.io` : 'http://localhost:4321');

const base =
  configuredBase ||
  (isGitHubPages && repositoryName && !isUserOrOrgPagesRepo ? `/${repositoryName}` : '/');

export default defineConfig({
  site,
  base,
  integrations: [mdx()],
  trailingSlash: 'never',
});
