# Sales & Market Access Performance Dashboard

A mid-level React dashboard for tracking revenue performance, enrollment growth, therapeutic coverage, and distribution channel effectiveness.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | **React 18+** (Vite) |
| Language | **JavaScript (ES6+)** |
| Build Tool | **Vite** |
| Charts | **Chart.js** + **react-chartjs-2** |
| Routing | **React Router v6** |
| Styling | **CSS Modules** with CSS custom properties |
| Data Source | **CSV file** served statically, parsed via **Papa Parse** |
| State Mgmt | **React Context** + **useReducer** |
| Persistence | **localStorage** |
| Icons | **Lucide React** |

## Project Structure

```
health-dashboard/
├── public/
│   ├── data/
│   │   └── sales-data.csv        # Single source of truth for dashboard data
│   └── favicon/
│       ├── apple-touch-icon.png
│       ├── favicon-32x32.png
│       ├── favicon-16x16.png
│       └── site.webmanifest
├── src/
│   ├── main.jsx                  # Entry point, app bootstrap
│   ├── App.jsx                   # Root layout + router
│   ├── styles/
│   │   ├── variables.css         # CSS custom properties (colors, spacing, typography)
│   │   └── global.css            # Base reset, body defaults, utility classes
│   ├── assets/                   # Static images/icons not in public/
│   ├── context/
│   │   └── DashboardContext.jsx  # React Context + useReducer for global state
│   ├── hooks/
│   │   ├── useDashboardData.js   # Fetch CSV, parse, and provide to context
│   │   ├── useLocalStorage.js    # Persist/restore user preferences
│   │   └── useChart.js           # Common chart lifecycle logic
│   ├── services/
│   │   └── csvService.js         # CSV fetching + Papa Parse wrapper
│   ├── utils/
│   │   ├── formatters.js         # Currency ($1.5k), percentage, date helpers
│   │   ├── aggregators.js        # Sum, average, group-by from raw CSV rows
│   │   └── constants.js          # Theme colors, chart defaults, config keys
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.module.css
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   │   └── Sidebar.module.css
│   │   ├── Header/
│   │   │   ├── Header.jsx        # Dashboard title, refresh, theme toggle
│   │   │   └── Header.module.css
│   │   ├── KpiCard/
│   │   │   ├── KpiCard.jsx       # Reusable KPI metric card
│   │   │   └── KpiCard.module.css
│   │   ├── ChartCard/
│   │   │   ├── ChartCard.jsx     # Chart wrapper with title, description, border
│   │   │   └── ChartCard.module.css
│   │   ├── DataTable/
│   │   │   ├── DataTable.jsx     # Sortable/filterable transactions table
│   │   │   └── DataTable.module.css
│   │   ├── RefreshButton/
│   │   │   ├── RefreshButton.jsx
│   │   │   └── RefreshButton.module.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.jsx   # Light/dark mode switch
│   │       └── ThemeToggle.module.css
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx           # Main dashboard — assembles KPIs + charts
│   │   │   └── Dashboard.module.css
│   │   ├── Transactions/
│   │   │   ├── Transactions.jsx         # Full-page transaction viewer with search
│   │   │   └── Transactions.module.css
│   │   └── Settings/
│   │       ├── Settings.jsx             # Theme, data refresh interval, preferences
│   │       └── Settings.module.css
│   └── charts/
│       ├── EnrollmentTrendChart.jsx     # Line chart — monthly enrollment over 12 months
│       ├── TherapeuticCoverageChart.jsx # Radar chart — coverage by therapeutic area
│       ├── EnrollmentByIndication.jsx   # Horizontal bar — patients by indication
│       ├── CoverageIndicationChart.jsx  # Doughnut (half) — treatment coverage by indication
│       ├── ChannelCoverageChart.jsx     # Horizontal bar — coverage by delivery channel
│       ├── GeographicCoverageChart.jsx  # Pie chart — coverage by region
│       ├── InsuranceCoverageChart.jsx   # Doughnut — insurance coverage split
│       ├── ProviderCoverageChart.jsx    # Grouped bar — coverage vs population by provider
│       └── GaugeChart.jsx               # Half-doughnut — forecasted vs actual
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Implementation Plan

### Phase 1 — Project Foundation

1. **Scaffold** — Run `npm create vite@latest` with React template. Remove boilerplate.

2. **Install dependencies** — `chart.js`, `react-chartjs-2`, `react-router-dom`, `papaparse`, `lucide-react`.

3. **Create `public/data/sales-data.csv`** — The single source of truth. Columns include:
   - `month`, `revenue`, `enrollments`, `therapeutic_area`, `indication`, `region`, `insurance_type`, `provider_type`, `delivery_channel`, `coverage_pct`

4. **Set up CSS variables** — `src/styles/variables.css` with light/dark theme tokens (colors, spacing, border-radius, shadows).

5. **Set up React Router** — Routes for `/` (Dashboard), `/transactions`, `/settings`.

### Phase 2 — Data Layer

6. **Build `csvService.js`** — Fetch `sales-data.csv` from `/data/` and parse with Papa Parse into structured JSON. Wrap in try/catch with fallback error state.

7. **Build `aggregators.js`** — Functions that consume raw CSV rows and produce chart-ready datasets (group by month, sum by region, average coverage by indication).

8. **Build `DashboardContext.jsx`** — Context provides:
   - `state: { rawData, aggregatedData, loading, error, theme, lastRefreshed }`
   - `dispatch` actions: `SET_DATA`, `SET_LOADING`, `SET_ERROR`, `TOGGLE_THEME`, `REFRESH`

9. **Build `useDashboardData.js`** — Custom hook that calls `csvService` on mount and on refresh, dispatches results to context.

### Phase 3 — UI Components

10. **Layout + Sidebar** — Shell with a collapsible sidebar containing nav links (Dashboard, Transactions, Settings).

11. **Header** — Dashboard title, current date/time, theme toggle button, refresh button with spinner.

12. **KPI Cards** — Reusable card accepting `title`, `value`, `prefix`, `trend`. Renders the top-level metrics (Total Revenue, Forecast).

13. **ChartCard** — Wrapper that accepts a `title`, `description`, `colorTheme` prop and renders the chart. Provides the consistent card styling and hover effect.

14. **DataTable** — Sortable table with column headers that toggle ascending/descending. Search/filter input. Reused on Dashboard (scrolling) and Transactions (full page).

### Phase 4 — Charts

15. **Create each chart component** — Each chart is a standalone React component in `src/charts/`. Uses `react-chartjs-2` wrappers. Accepts data via props. Pattern:

    ```jsx
    // EnrollmentTrendChart.jsx
    import { Line } from 'react-chartjs-2';
    import {
      Chart as ChartJS,
      CategoryScale, LinearScale, PointElement, LineElement,
      Filler, Tooltip, Legend
    } from 'chart.js';

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

    export default function EnrollmentTrendChart({ data }) {
      const chartData = {
        labels: data.labels,
        datasets: [{
          label: 'Monthly Enrollments',
          data: data.values,
          borderColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--color-primary').trim(),
          fill: true,
          tension: 0.4
        }]
      };
      return <Line data={chartData} options={...} />;
    }
    ```

16. **Register Chart.js components once** — In `main.jsx` or a `src/charts/registry.js`, register all needed scales/elements/controllers globally.

17. **Map context data to chart props** — In `Dashboard.jsx`, derive each chart's data from the aggregated state and pass as props.

### Phase 5 — Polish

18. **Theme toggle** — Toggle a `data-theme` attribute on `<html>` between `"light"` and `"dark"`. CSS custom properties react automatically. Persist choice in localStorage.

19. **Responsive layout** — Sidebar collapses to hamburger on mobile. Charts grid goes from 3-column to 1-column. KPI cards stack vertically.

20. **Loading states** — Skeleton placeholders for KPI cards and chart canvases while CSV is being fetched/parsed.

21. **Error states** — Inline error banner if CSV fails to load, with a retry button.

22. **Empty states** — Graceful rendering if a CSV column is missing or has no data for a given chart.

## CSV Data Format

The file `public/data/sales-data.csv` drives the entire dashboard. Design it with these columns:

| Column | Example | Used By |
|---|---|---|
| `month` | 2024-01 | EnrollmentTrendChart |
| `revenue` | 18500 | KPI: Total Revenue |
| `forecast` | 79100 | KPI: Forecast, GaugeChart |
| `actual` | 19000 | GaugeChart |
| `therapeutic_area` | Oncology | TherapeuticCoverageChart |
| `coverage_pct` | 85 | Various coverage charts |
| `indication` | Type 2 Diabetes | EnrollmentByIndication, CoverageIndicationChart |
| `enrolled_patients` | 3200 | EnrollmentByIndication |
| `region` | Northeast | GeographicCoverageChart |
| `insurance_type` | Fully Covered | InsuranceCoverageChart |
| `provider_type` | In-Network | ProviderCoverageChart |
| `patient_pop_pct` | 65 | ProviderCoverageChart |
| `delivery_channel` | Hospital Network | ChannelCoverageChart |
| `order_id` | 1001 | DataTable |
| `product_name` | Laptop | DataTable |
| `product_category` | Electronics | DataTable |
| `salesperson` | Jane Smith | DataTable |
| `status` | Shipped | DataTable |
| `unit_price` | 1200 | DataTable |
| `order_date` | 2024-05-10 | DataTable |

> **Design principle:** Store raw transactional data in the CSV and compute aggregations in `aggregators.js`. This keeps the data file portable and the dashboard logic transparent. When the CSV grows large, you can move aggregation to a backend without changing the chart components.

## Running the Project

```bash
npm install
npm run dev       # Development server with HMR at localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

## Design Decisions

- **React over Vanilla JS** — Better suited for mid-to-senior role demos. Component model, hooks, and Context API showcase modern patterns. Job market alignment is stronger with React.

- **CSV as data source** — No backend required. Simple to edit. Easy to swap for a real API later by replacing `csvService.js` with a fetch-based service that returns the same shape. Demonstrates separation of concerns.

- **No Tailwind** — CSS Modules + custom properties keep dependencies minimal and show proficiency with plain CSS. Easier to control the branded look. Tailwind can be added later if desired.

- **Feature-first file structure** — Chart components live in `src/charts/`, page layouts in `src/pages/`, shared UI in `src/components/`. Related code stays together. This scales well to 10+ pages.

- **Context + useReducer instead of Redux/Zustand** — Appropriate for a single-dashboard app. Avoids unnecessary dependencies. Demonstrates understanding of React built-in state management.

## Future Enhancements

- Replace CSV with a REST API or GraphQL endpoint
- Add user authentication with role-based access (Admin/Viewer)
- Real-time data via WebSockets
- Export dashboard as PDF or PNG
- Automated email reports (as referenced in the original HTML description)
- Unit tests with Vitest + React Testing Library
- E2E tests with Playwright
- Dark mode (already architected via CSS custom properties)
