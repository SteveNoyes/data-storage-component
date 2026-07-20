# Sales & Market Access Performance Dashboard

An interactive, single-page dashboard that provides a real-time overview of revenue performance, enrollment growth, therapeutic coverage, and distribution channel effectiveness.

## Features

- **KPI Cards** — Total Revenue and Forecast displayed at the top
- **Monthly Enrollment Trend** — Line chart tracking patient enrollment growth over 12 months
- **Therapeutic Area Coverage** — Radar chart showing coverage across oncology, cardiology, endocrinology, pulmonology, rheumatology, and neurology
- **Patient Enrollment by Indication** — Horizontal bar chart grouped by medical indication
- **Treatment Coverage by Indication** — Doughnut chart showing Q1–Q4 coverage percentage trends
- **Transactions Table** — Scrollable table of recent orders with auto-generated mock data
- **Refresh Button** — Regenerates all mock data and updates every chart instantly
- **Responsive Design** — Adapts to desktop and mobile viewports
- **Back Navigation** — Fixed-position back button for easy navigation

## Tech Stack

- HTML5, CSS3 (inline)
- JavaScript (vanilla)
- [Chart.js](https://www.chartjs.org/) via CDN

## Getting Started

Open `index.html` in any modern browser:

```bash
# No build step required
open index.html
```

## How It Works

On page load (and each refresh click), `generateMockData()` produces randomized data for every chart and the transaction table. Each chart instance is updated in place using Chart.js's `update()` method, so no full re-render is needed. A color palette is defined globally and applied consistently across all visualizations.
