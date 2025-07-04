# My Component Library Desktop App

A desktop application designed to store, manage, preview, and reuse your personal collection of UI components (React, HTML snippets) and associated CSS. Built with Electron, Vite, React, and Tailwind CSS, with data stored locally using SQLite.

## Features

* **Local Component Storage:** Save and organize your React components, HTML snippets, and CSS.
* **Categorization:** Name, describe, and tag components for easy searching and filtering.
* **Live Preview:** Instantly see a preview of your React components within a sandboxed environment.
* **Code Management:** View and copy component code (JSX, HTML, CSS) to your clipboard.
* **Cross-Platform:** Runs on Windows, macOS, and Linux thanks to Electron.
* **Modern UI:** Built with React and styled with Tailwind CSS.
* *(Planned/Future Features: Add any other features you envision)*

## Tech Stack

* **Framework:** [Electron](https://www.electronjs.org/)
* **UI (Renderer):** [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/) for development and bundling)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database:** [SQLite](https://www.sqlite.org/index.html) (using `better-sqlite3` for Node.js)
* **Native Module Rebuild:** `electron-rebuild`
* **Packaging:** [Electron Builder](https://www.electron.build/)

## Prerequisites

* [Node.js](https://nodejs.org/) (LTS version recommended, includes npm)
* [Git](https://git-scm.com/)
* (For Windows users building native modules): Python and C++ Build Tools (often via Visual Studio Build Tools or `windows-build-tools`)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install dependencies:**
    This will install dependencies for both the root Electron project and the React app in the `src` directory.
    ```bash
    npm install
    cd src
    npm install
    cd ..
    ```
    *(Alternatively, if you have a postinstall script or manage dependencies from the root, adjust accordingly. The current setup from the guide has separate `node_modules` for root and `src` before Vite build.)*

3.  **Rebuild Native Modules (if necessary):**
    If you encounter issues with native modules like `better-sqlite3` (especially after installing or changing Node/Electron versions), rebuild them:
    ```bash
    npm run rebuild-sqlite
    ```
    *(Ensure you have a script like `"rebuild-sqlite": "electron-rebuild -f -w better-sqlite3"` in your root `package.json`)*

## Running the Application (Development)

To start the application in development mode (with Vite's HMR for the React app and Electron DevTools):

```bash
npm run dev