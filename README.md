# My Timetable (PWA)

A personal class and study timetable that installs on your phone and works offline.

## Files (keep them all together in the repo root, no folders)

| File | What it does |
|---|---|
| `index.html` | The page |
| `style.css` | Look and dark mode |
| `app.js` | Tabs, Today view, install button |
| `data.js` | **Your timetable. This is the only file you edit.** |
| `manifest.webmanifest` | Makes the app installable |
| `sw.js` | Offline support |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | App icons |

## Publish on GitHub Pages

1. On GitHub, create a new **public** repository (for example `timetable`).
2. Click **Add file → Upload files**. Drag in every file listed above, then click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
4. Wait one to two minutes. Your app will be at `https://YOUR-USERNAME.github.io/timetable/`.

## Install on your phone

- **Android (Chrome):** open the link, then tap the **Install** button in the app, or the menu (⋮) → **Install app**.
- **iPhone (Safari):** open the link, tap **Share**, then **Add to Home Screen**.

Open it once while online so it can save itself for offline use.

## Change a venue or a time

1. In your repo, open `data.js` and click the pencil icon.
2. Edit the line. For example, to set the Wednesday MAT101 venue, change `venue: null` to `venue: "LT20"` on that line.
3. Click **Commit changes**. Wait a minute, then open the app while online. The new data shows up.

Times use `t(hour, minute)` in 24-hour format, so 1:30 PM is `t(13, 30)`.

## If something looks stuck

Close the app fully and reopen it while online. If the old version still shows, clear the site data for the page in your browser settings.
