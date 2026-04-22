# SitioCRM - CRM Web Frontend

A modern, responsive Customer Relationship Management (CRM) application built with React, Vite, and Tailwind CSS.

## Features

### Dashboard
- **KPI Cards**: Quick overview of total contacts, active deals, monthly revenue, and pending tasks with trend indicators
- **Recent Deals Table**: Display of latest deals with stages and values
- **Activity Feed**: Real-time updates on business activities

### Contacts Management
- View all contacts with search functionality
- Add new contacts with modal form
- Edit contact information
- Delete contacts
- Filter by status (Activo, Inactivo, Prospecto)

### Deals Pipeline
- **Kanban Board**: 5-stage pipeline (Prospecto → Calificado → Propuesta → Negociación → Cerrado)
- Visual representation of deals at each stage
- Total value calculation per stage
- Quick deal overview with client and revenue information

### Activities & Tasks
- Create and manage tasks with priority levels (Alta, Media, Baja)
- Mark tasks as complete/incomplete
- Filter by status (Todas, Pendientes, Completadas)
- Set due dates for follow-ups

### Reports & Analytics
- **Revenue Charts**: Monthly revenue trends visualization
- **Deal Distribution**: Pipeline stage breakdown
- **Team Performance**: Individual sales metrics including close rates

## Tech Stack

- **React 18**: Modern UI library
- **Vite**: Lightning-fast build tool
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful SVG icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build

```bash
npm run build
```

Generates optimized production build in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx      # Main layout with sidebar and header
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── Header.jsx      # Top header with search and user profile
├── pages/
│   ├── Dashboard.jsx   # Dashboard with KPIs and recent activity
│   ├── Contacts.jsx    # Contacts management
│   ├── Deals.jsx       # Deals kanban board
│   ├── Activities.jsx  # Task management
│   └── Reports.jsx     # Analytics and reports
├── App.jsx             # Main app with routing
├── main.jsx            # React entry point
└── index.css           # Tailwind CSS styles
```

## Features

✅ Fully functional mock data (no API calls)
✅ Responsive design for all screen sizes
✅ Dark-mode compatible styling foundation
✅ Modular component architecture
✅ Client-side state management with React hooks
✅ Clean, professional UI with Tailwind CSS

## Notes

- All data is currently hardcoded for demonstration purposes
- No backend API integration required
- Ready to be connected to a REST/GraphQL backend
