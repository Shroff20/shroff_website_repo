# Dr. Sameer Shroff - Portfolio & Technical Services Website

A modern, responsive, high-performance static website for **Dr. Sameer Shroff, Ph.D.**, showcasing technical background, specialized consulting services, computational & engineering projects, and direct contact options.

Built with **pure HTML5, CSS3, and JavaScript** — zero external build steps, zero node dependencies, fast loading, and 100% accessible.

---

## 🌟 Features

- **Semantic HTML5 & Pure CSS Design System**: Clean typography, responsive grid layouts, fluid typography, and glassmorphic card designs.
- **Dark & Light Mode Switcher**: Seamless theme toggle with local storage persistence and system preference autodetection (`prefers-color-scheme`).
- **Comprehensive Showcase Sections**:
  - **Hero & Highlights**: High-impact bio, key stats (CMU Ph.D., Bettis Atomic Power Laboratory, 10+ years R&D, Rickover Fellowship mentor), and dual calls to action.
  - **Background & Bio**: Detailed narrative of doctoral work at Carnegie Mellon University (De Boer Research Group: Mechanics of Materials) and mission-critical engineering at Bettis / Naval Nuclear Laboratory.
  - **Interactive Career & Education Timeline**: Visual progression of research, academic degrees, and honors.
  - **Core Skills Matrix**: Scientific computing, FEA / structural dynamics, microscale mechanics/MEMS, and engineering standards.
  - **Consulting Services**: 6 detailed service cards covering FEA, physics-informed machine learning (PINNs), tribology/contact mechanics, custom scientific software, and advisory.
  - **Projects & Research Portfolio**: Interactive category filter tabs (Machine Learning & Dynamics, Mechanics & Materials, Computational Simulation) with custom SVG technical diagrams.
  - **Interactive Deep-Dive Modal**: Clickable "View Details" modals with expanded technical methodology, engineering outcomes, and toolchains.
  - **Contact & Inquiry System**: Direct contact info (`sshroff@andrew.cmu.edu`), one-click email copy button with toast notification, and an interactive project inquiry form that formats and launches inquiries directly.
- **Accessible & Fast**: Complete keyboard navigation, ARIA attributes, responsive mobile drawer menu, and zero external CDNs required.

---

## 📁 Repository Structure

```
shroff_website_repo/
├── index.html            # Main semantic webpage with all sections and modals
├── css/
│   └── styles.css        # Pure CSS design system, dark/light themes, animations
├── js/
│   └── main.js           # Theme toggle, project filtering, modal dialog, form handler
├── assets/
│   └── favicon.svg       # Custom branded SVG favicon
└── README.md             # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

Because this project is built with pure HTML, CSS, and JS, **no installation or build command is required**.

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open it immediately in Chrome, Edge, Safari, or Firefox.

### Option 2: Using Python HTTP Server (Recommended)
Open PowerShell or your terminal in this directory and run:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
Right-click `index.html` inside VS Code and select **"Open with Live Server"**.

---

## 🛠️ How to Customize

- **Updating Contact Information**:
  Search for `sshroff@andrew.cmu.edu` in `index.html` and `js/main.js` to change the email address or add phone/social links.
- **Adding / Modifying Projects**:
  - Edit or add project cards in `index.html` under the `<section id="projects">` container.
  - To update deep-dive modal descriptions, edit the `projectData` object inside `js/main.js`.
- **Customizing Services**:
  Update service titles, feature checklists, and descriptions in `index.html` under `<section id="services">`.
- **Styling & Color Palettes**:
  All primary colors, gradients, font families, and card styles are controlled via CSS variables at the top of `css/styles.css`.

---

## 🌐 Free One-Click Deployment Options

### 1. GitHub Pages
1. Push this repository to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of static website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In the repository settings on GitHub, navigate to **Settings > Pages**.
3. Under **Build and deployment**, select `Deploy from a branch` and choose `main` / `root`.
4. Your site will be live instantly at `https://<your-username>.github.io/<repo-name>/`.

### 2. Netlify / Vercel
Simply drag and drop the `shroff_website_repo` folder into [Netlify Drop](https://app.netlify.com/drop) or import the GitHub repository into [Vercel](https://vercel.com) for instant global CDN hosting with automated SSL and custom domain support.
