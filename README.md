# Portfolio Starter (Brittany Chiang–style)

This is a drop-in bundle you can merge into a fork of [bchiang7/bchiang7.github.io].

## Quick Start

1. **Create the repo**
   - Fork the original repo, or create a new repo and copy these files in.
   - If you name it `yourusername.github.io`, GitHub Pages will auto-host it.

2. **Install & Run Locally (optional)**
   ```bash
   gem install bundler jekyll jekyll-minifier jekyll-sitemap jekyll-feed jekyll-seo-tag
   npm install
   jekyll serve
   ```

3. **Customize**
   - Edit `_config.yml` with your URL once you know it.
   - Update data in `_data/experience.yml`, `_data/education.yml`, `_data/skills.yml`, and `_data/projects.yml`.
   - Accent color is set to **#7AA2F7** in `assets/css/custom.css` (change `--accent`).

4. **Deploy**
   - Push to `main`/`master` on GitHub. Enable Pages if needed: Settings → Pages → Deploy from branch.

## Notes
- Your resume is at `/static/resume.pdf` and linked from the header.
- Add images to `/img` and reference them in `_data/projects.yml`.
