# CA-3-Mini-Project-Self-Portfolio
# Bhumika Arora · Portfolio

A soft pastel light-blue personal portfolio for **Bhumika Arora**, 3rd-year CSE (AI & ML) student at Symbiosis Institute of Technology, Nagpur.

Plain HTML, CSS and JavaScript. There is no build step and nothing to install.

## Features

- Typing animation in the hero
- Mouse-reactive effects: a soft cursor glow, drifting background blobs, 3D tilt cards and magnetic buttons
- Flip project cards (hover on desktop, tap or press Enter on touch and keyboard)
- Light / dark mode toggle that remembers your choice and respects your system setting
- Animated counters, scroll-reveal sections, scroll progress bar, active nav highlighting and a back-to-top button
- Filterable photo gallery with a keyboard-friendly lightbox
- Working contact form that sends to **abhumika24@gmail.com** (see below)
- Responsive down to small phones, and honours `prefers-reduced-motion`

## Project structure

```
.
├── index.html
├── css/style.css
├── js/main.js
├── assets/img/        (optimised photos)
├── .nojekyll
└── README.md
```

## Run it locally

Just open `index.html` in a browser. Or, from this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `portfolio`. For a root URL, name it `bhumikaarorasit24.github.io`.
2. Upload everything in this folder to the repository (drag and drop works) or push it:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio website"
   git branch -M main
   git remote add origin https://github.com/bhumikaarorasit24/portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose **main** and **/ (root)**, then **Save**.
4. After a minute your site is live at `https://bhumikaarorasit24.github.io/portfolio/`.

## Activate the contact form (one time, 1 minute)

The form uses [FormSubmit](https://formsubmit.co), a free service that emails each message to the address in the form. No account or API key is needed.

1. Publish the site (the form needs to be on a real web address).
2. Send yourself a test message through the form.
3. FormSubmit emails **abhumika24@gmail.com** an activation link. Check Spam if you don't see it, then click **Activate**.
4. From then on, every message arrives straight in your inbox.

If the form ever fails, the page shows your email address as a fallback.

## Customising

- **Text and sections:** edit `index.html`.
- **Colours:** change the variables at the top of `css/style.css` (`:root` for light mode, `html[data-theme="dark"]` for dark mode).
- **Typing phrases:** edit the `phrases` array near the top of `js/main.js`.
- **Photos:** drop new images into `assets/img/` and add a `<figure class="g-item" ...>` block in the gallery section.
- **Instagram link:** `https://www.instagram.com/secondlastdraft/`

## Notes

- The Centelli internship card only uses facts you shared: 6 weeks, offline, Lead Software Dev Intern, AI automation for business solutions. Add concrete projects or outcomes when you want to.
- Your phone number from the CV is intentionally **not** on the site.
- The book is shown as "Draft 1, in progress". Add its title when you're ready to reveal it.
