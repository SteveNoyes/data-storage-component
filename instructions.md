# Health Dashboard - Setup Instructions

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node)

### Steps

1. Open a terminal and navigate to the project folder:

   ```bash
   cd health-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser to [http://localhost:5173](http://localhost:5173).

The dev server supports hot module replacement -- changes to source files will reflect in the browser instantly without a full reload.

### Other Commands

| Command | Description |
|---|---|
| `npm run build` | Creates a production build in the `dist/` folder |
| `npm run preview` | Previews the production build locally (run `npm run build` first) |
| `npm run lint` | Runs the linter (oxlint) |

---

## Deploying to cPanel

This is a static React SPA (Single Page Application) with no server-side logic. It produces a flat `dist/` folder that can be served from any static web host.

### Step 1 -- Build the project

On your local machine, run:

```bash
npm run build
```

This creates a `dist/` folder containing the production-ready files:

```
dist/
  index.html
  favicon.svg
  assets/
    index-*.js
    index-*.css
  favicon/
    site.webmanifest
  data/
    sales-data.csv
```

### Step 2 -- Upload to cPanel

1. Log in to your cPanel and open **File Manager**.
2. Navigate to `public_html` (or the subdirectory you want the app to live in, e.g. `public_html/dashboard`).
3. Upload **everything inside the `dist/` folder** (not the folder itself) so that `index.html` is at the root of your target directory.

### Step 3 -- Configure URL Rewriting (Required)

React Router uses client-side routing (paths like `/transactions` and `/settings`). Without a rewrite rule, refreshing on any route other than `/` or directly navigating to a deep link will return a 404 from the server.

In your target directory, create a `.htaccess` file with the following contents:

```apache
RewriteEngine On

# If the requested file or directory does not exist on the server,
# rewrite everything to index.html so React Router can handle it.
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

Place this `.htaccess` file in the same directory where you uploaded `index.html`.

### Step 4 -- Verify

1. Visit your domain (or subdirectory URL) in a browser.
2. Confirm the dashboard loads.
3. Click the **Transactions** and **Settings** sidebar links.
4. Refresh the page on a deep link (e.g. `/transactions`) -- it should still load the app instead of showing a 404.

---

## Notes

- **No environment variables required.** The app has no API keys or backend configuration.
- **No database.** All data comes from `public/data/sales-data.csv`, which is bundled into the build and served as a static file.
- **To update the data**, replace `public/data/sales-data.csv` with your new CSV file (keeping the same column structure), rebuild with `npm run build`, and re-upload the `dist/` folder.
- The app supports **light and dark themes**. The theme preference is stored in the browser's localStorage.
