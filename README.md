# Mohammad Ayaz Amiri — Portfolio

A responsive, accessible portfolio built with plain HTML, CSS, and JavaScript. The project is intentionally dependency-free and can be deployed as a static site.

## Run locally

From the project directory, start a local static server:

```powershell
python -m http.server 4173
```

Keep the terminal window open while you browse to `http://localhost:4173`. The server stops when you close its terminal; if the address stops loading, start the command again.

The contact form validates the fields in your browser, then prepares a prefilled email draft in your default email app. It does not collect or store submissions on this website.

## Deploy to Vercel

The site files live at the repository root and need no build command. Set the Vercel project’s framework preset to **Other**, leave the build command empty, and use `.` as the output directory. When the Vercel project is linked to this GitHub repository, pushing to its production branch starts a deployment.

## Content and assets

- `assets/profile.jpg` — supplied profile photo
- `assets/Mohammad_Ayaz_Amiri_CV.pdf` — downloadable résumé
- `index.html`, `styles.css`, and `script.js` — portfolio source

Portfolio details are based on the supplied résumé. Contact information is limited to the email address and public profiles provided there or by the site owner.
