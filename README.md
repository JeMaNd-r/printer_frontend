# 3D Printer Dashboard - Frontend

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Dedicated Nuxt web application for monitoring the printer, exploring its history and managing print projects.

The application provides an overview of the printer's current status, including temperatures, print progress, and other relevant printer information. It communicates with the [project's backend API](https://github.com/JeMaNd-r/printer_dashboard) to retrieve and display printer data.


## Features

- 🖨️ Printer dashboard with current printer and detailed status
- 🌡️ Temperature monitoring for nozzle, print bed, and chamber
- 💡 Printer light status and control
- 🔄 Automatic data refresh
- 📊 Printer statistics with recorded states and timestamps
- 📈 Interactive charts of printer and temperature data over time
- 🔎 Detailed printer-state views for individual measurements
- 📁 Project overview grouped by printing status
- 🖼️ Project details including project name, owner, creation date, and print image
- ⚡ Fast, component-based interface built with Nuxt, Vue and TypeScript
- 🔗 REST API Integration that communicates with the Django backend through its API
- 📱 Responsive design foor desktop and mobile devices


## Tech Stack

- Nuxt
- Vue
- TypeScript
- Nuxt UI
- Tailwind CSS


## Getting Started

### Backend

The frontend communicates with the corresponding 3D-printer backend through its API.

Make sure the backend is running and that the API endpoint is configured correctly before starting the frontend.

### Requirements

- Node.js
-  pnpm

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
pnpm install
```

### Setup

Make sure to install the dependencies:

```bash
pnpm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

### Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.


## Screenshots

Soon...
