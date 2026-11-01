S2000 GARAGE v0.11 — DATA PROTECTION + OFFLINE FOUNDATION

UPLOAD ALL FOUR FILES to GitHub repository root (not the ZIP): index.html, manifest.webmanifest, icon.svg, service-worker.js.
Open https://pierbrwn.github.io/s2000-garage/?version=0.11 in Safari. Refresh after GitHub Pages deploys. Use Share > Add to Home Screen. After visiting online, test in Airplane Mode.

Complete backup: use the Backup & Recovery section at the top of the app. It exports notes/drafts from IndexedDB (with legacy localStorage fallback), plus quantities from localStorage. Save the downloaded JSON to iCloud Drive and verify it exists. Test restore with disposable data.

IMPORTANT: IndexedDB and browser storage are NOT permanent guarantees. An installed PWA may be removed or cached data cleared. GitHub Pages must be reachable for a new install. A full backup of the source files and exported user data is essential.

The 3D display is a schematic, not accurate vehicle CAD. Factory specs must be verified independently before repair.
