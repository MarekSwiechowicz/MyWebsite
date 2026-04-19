# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring smooth animations and a clean design.

## 🚀 Features

- Responsive design optimized for all devices
- Dark/Light theme support
- Smooth animations using Framer Motion and React Spring
- Internationalization support
- Optimized performance with Next.js
- TypeScript for type safety
- Modern UI with Tailwind CSS

## 🛠️ Technology Stack

- **Framework:** Next.js 13.2.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, React Spring
- **Internationalization:** Next-i18next
- **Theme Management:** Next-themes
- **Analytics:** Vercel Analytics
- **Testing:** Playwright
- **Linting:** ESLint

## 📦 Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Playwright tests

## 🎨 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Next.js pages and API routes
└── styles/        # Global styles and Tailwind config
```

## 🔧 Configuration

- Font optimization using `next/font` with Inter Google Font
- Tailwind CSS for styling
- ESLint for code quality
- TypeScript for type safety

## 🔄 Development Workflow

1. Create a branch: `git checkout -b fix/analytics` (or `feature/new-section`)
2. Make changes, commit, push: `git push -u origin fix/analytics`
3. Open a Pull Request on GitHub
4. Wait for CI (Playwright tests) to pass ✓
5. Merge to main — only when checks are green

This keeps `main` always deployable.

**Enable branch protection** (one-time setup on GitHub):
- Repo → **Settings** → **Branches** → **Add rule**
- Branch name: `main`
- ✓ Require a pull request before merging
- ✓ Require status checks to pass → select "Full E2E (localhost)"
- Save

## 🚀 Deployment

This project is configured for deployment on Vercel. The deployment process is automated through Vercel's platform.

## 📝 License

MIT

## 👤 Author

Marek Święchowicz
