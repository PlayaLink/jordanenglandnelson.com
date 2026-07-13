import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.resolve(
  root,
  process.env.WEBFLOW_EXPORT_DIR || 'portfolio-site-1c56f5.webflow',
);
const publicDir = path.resolve(root, 'public');
const storyNavigationStyles = path.resolve(root, 'src/styles/story-navigation.css');
const astroOwnedHtmlFiles = new Set([
  'index.html',
]);
const featuredCaseStudyPages = new Map([
  [
    'meetly-navigation.html',
    {
      nextStory: {
        title: 'An admin settings engine that reduced onboarding time by 33%',
        href: 'admin-settings-management-system.html',
        thumbnail: 'images/admin-settings/eclosing-settings-notifications.png',
      },
    },
  ],
  [
    'admin-settings-management-system.html',
    {
      nextStory: {
        title: 'Designing a home on wheels in NYC',
        href: 'how-to-live-in-a-van-in-nyc.html',
        thumbnail: 'images/van_thumbnail.png',
      },
    },
  ],
  ['how-to-live-in-a-van-in-nyc.html', { nextStory: null }],
]);
const logRocketAppId = 'jordan-england-nelson-personal/webflow-portfolio-site';
const logRocketCdnUrl = 'https://cdn.logr-in.com/LogRocket.min.js';
const logRocketSnippet = `  <script src="${logRocketCdnUrl}" crossorigin="anonymous"></script>
  <script>
    (function () {
      var disabledHostnames = ["", "localhost", "127.0.0.1", "0.0.0.0", "::1"];

      if (disabledHostnames.indexOf(window.location.hostname) !== -1) {
        return;
      }

      window.LogRocket && window.LogRocket.init("${logRocketAppId}");
    })();
  </script>`;
const logRocketSnippetPattern =
  /\s*<script src="https:\/\/cdn\.(?:lr-ingest\.com|logr-in\.com)\/LogRocket\.min\.js"[^>]*><\/script>\s*<script>[\s\S]*?LogRocket\.init[\s\S]*?<\/script>/g;

if (!existsSync(sourceDir)) {
  throw new Error(`Webflow export not found: ${sourceDir}`);
}

mkdirSync(publicDir, { recursive: true });

for (const entry of ['css', 'fonts', 'images', 'js', 'videos', 'documents']) {
  rmSync(path.join(publicDir, entry), { force: true, recursive: true });
}

for (const entry of readdirSync(publicDir)) {
  if (entry.endsWith('.html')) {
    rmSync(path.join(publicDir, entry), { force: true });
  }
}

for (const entry of readdirSync(sourceDir)) {
  cpSync(path.join(sourceDir, entry), path.join(publicDir, entry), {
    recursive: true,
  });
}

cpSync(storyNavigationStyles, path.join(publicDir, 'css', 'story-navigation.css'));

const assetIndex = new Map();

function walkFiles(dir) {
  const results = [];

  if (!existsSync(dir)) {
    return results;
  }

  for (const entry of readdirSync(dir)) {
    const absolute = path.join(dir, entry);

    if (statSync(absolute).isDirectory()) {
      results.push(...walkFiles(absolute));
    } else {
      results.push(absolute);
    }
  }

  return results;
}

function normaliseAssetName(value) {
  const withoutQuery = decodeURIComponent(value).split('?')[0];
  const basename = path.basename(withoutQuery);
  const extension = path.extname(basename).toLowerCase();
  const stem = basename
    .slice(0, basename.length - extension.length)
    .replace(/^[a-f0-9]{20,}_/i, '');

  return `${stem.toLowerCase().replace(/[^a-z0-9]+/g, '')}${extension}`;
}

for (const assetDir of ['images', 'videos']) {
  for (const absolute of walkFiles(path.join(publicDir, assetDir))) {
    const relative = path.relative(publicDir, absolute).split(path.sep).join('/');
    assetIndex.set(normaliseAssetName(relative), relative);
  }
}

function localiseWebflowAssetUrl(url) {
  const match = assetIndex.get(normaliseAssetName(url));
  return match || url;
}

function renderNextStory(nextStory) {
  if (!nextStory) {
    return '';
  }

  return `
    <div class="next-story-wrapper">
      <p class="next-story__eyebrow">Next case study</p>
      <a class="next-story" href="${nextStory.href}" aria-label="Next case study: ${nextStory.title}">
        <img src="${nextStory.thumbnail}" alt="" loading="lazy">
        <span class="next-story__content">
          <span class="next-story__title-row">
            <span class="next-story__title">${nextStory.title}</span>
            <span class="next-story__arrow" aria-hidden="true">→</span>
          </span>
        </span>
      </a>
    </div>`;
}

function patchFeaturedCaseStudy(html, { nextStory }) {
  html = html.replace(
    '<link href="css/portfolio-site-1c56f5.webflow.css" rel="stylesheet" type="text/css">',
    `<link href="css/portfolio-site-1c56f5.webflow.css" rel="stylesheet" type="text/css">
  <link href="css/story-navigation.css" rel="stylesheet" type="text/css">`,
  );

  html = html
    .replace(
      '<a href="index.html" class="go-back-button w-inline-block">',
      '<a href="index.html#case-studies-title" class="go-back-button story-return__back w-inline-block" aria-label="Back to stories">',
    )
    .replace('<div class="text-block-12">Back</div>', '<div class="text-block-12">Jordan England-Nelson</div>');

  const footer = `  <nav class="story-footer-nav${nextStory ? '' : ' story-footer-nav--last'}" aria-label="Portfolio stories">
    <a class="story-return__back" href="index.html#case-studies-title" aria-label="Back to stories">
      <span aria-hidden="true">←</span>
      <span>Jordan England-Nelson</span>
    </a>${renderNextStory(nextStory)}
  </nav>
`;

  return html.replace(
    /  <script src="https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-[^"]+"/,
    `${footer}  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=64792ae6db66683c7e64c158"`,
  );
}

function patchHtml(filePath) {
  let html = readFileSync(filePath, 'utf8');

  html = html.replace(logRocketSnippetPattern, '');
  html = html.replace(/\s*<\/head>/i, `\n${logRocketSnippet}\n</head>`);

  html = html.replace(
    /https:\/\/uploads-ssl\.webflow\.com\/[^"'<>]+?\.(?:gif|jpe?g|mov|mp4|png|svg|webm)/g,
    localiseWebflowAssetUrl,
  );

  html = html
    .replace(
      /https:\/\/uploads-ssl\.webflow\.com\/6022af993a6b2191db3ed10c\/628299f8aa233b83918e24fd_Pause\.svg/g,
      'images/webflow-pause.svg',
    )
    .replace(
      /https:\/\/uploads-ssl\.webflow\.com\/6022af993a6b2191db3ed10c\/628298b20ae0236682d4b87f_Play-24\.svg/g,
      'images/webflow-play.svg',
    )
    .replace(
      /https:\/\/uploads-ssl\.webflow\.com\/64792ae6db66683c7e64c158\/64fa019a83dd2fc2cf60f395_workspace\.jpg/g,
      'images/workspace_view.jpg',
    );

  html = html.replace(/(src=["'])documents\/([^"']+)(["'])/g, (match, prefix, fileName, suffix) => {
    const replacement = `videos/${fileName}`;
    return existsSync(path.join(publicDir, replacement)) ? `${prefix}${replacement}${suffix}` : match;
  });

  html = html.replace(
    /<link rel="(prefetch|prerender)" href="\/([^"]*)">/g,
    (match, rel, slug) => {
      if (!slug) {
        return `<link rel="${rel}" href="index.html">`;
      }

      const fileName = `${slug}.html`;
      return existsSync(path.join(publicDir, fileName))
        ? `<link rel="${rel}" href="${fileName}">`
        : match;
    },
  );

  html = html.replace(/action="\/search"/g, 'action="search.html"');

  const featuredCaseStudy = featuredCaseStudyPages.get(path.basename(filePath));

  if (featuredCaseStudy) {
    html = patchFeaturedCaseStudy(html, featuredCaseStudy);
  }

  writeFileSync(filePath, html);
}

for (const htmlFile of walkFiles(publicDir).filter((file) => file.endsWith('.html'))) {
  patchHtml(htmlFile);
}

for (const htmlFile of astroOwnedHtmlFiles) {
  rmSync(path.join(publicDir, htmlFile), { force: true });
}

writeFileSync(path.join(publicDir, '.nojekyll'), '');
writeFileSync(path.join(publicDir, 'CNAME'), 'jordanenglandnelson.com\n');
writeFileSync(path.join(publicDir, 'robots.txt'), 'User-agent: *\nAllow: /\n');
writeFileSync(
  path.join(publicDir, 'images', 'webflow-pause.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M7 5h3v14H7zM14 5h3v14h-3z"/></svg>\n',
);
writeFileSync(
  path.join(publicDir, 'images', 'webflow-play.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>\n',
);

console.log(`Prepared Webflow export from ${path.relative(root, sourceDir)} into public/`);
