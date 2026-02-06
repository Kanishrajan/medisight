# **App Name**: MediSight Insights

## Core Features:

- ALOS Calculation: Cloud Function to calculate Average Length of Stay (ALOS) daily, weekly, and monthly. Stores results in analyticsSnapshots.
- Bed Occupancy Analysis: Cloud Function computes and stores Bed Occupancy Rate (daily, weekly, monthly) in analyticsSnapshots. Display Bed Occupancy trends using charts and graphs.
- Predictive Alerts Tool: AI powered Cloud Function predicts ICU bed, ventilator, and doctor overload using moving averages. A reasoning LLM will assess if the condition warrants an alert, which is stored in predictiveAlerts collection. The model will decide when and if to incorporate each alert to trigger when appropriate.
- Automated Reporting: Cloud Function generates monthly PDF/CSV reports, saves them to Firebase Storage, and stores the links in the reports collection.
- KPI Summary Endpoint: API endpoint (/kpis/summary) delivers aggregated KPIs optimized for BI tools.
- Role-Based Access Control: Firestore security rules enforce access based on roles (admin, hospitalManager, analyst, viewer).
- Interactive Dashboards: Visual representation of hospital operations analytics. Provides role based access to allow administrators to view and configure alerts.

## Style Guidelines:

- Primary color: Deep Blue (#3F51B5) to convey trust, stability, and medical expertise.
- Background color: Light Gray (#F0F4F7), a desaturated hue from the primary, creating a clean and professional backdrop.
- Accent color: Light Blue (#81D4FA), an analogous hue providing contrast for interactive elements and highlights.
- Body and headline font: 'Inter', a grotesque-style sans-serif, lends a modern, neutral, and objective look, making it suitable for both headlines and body text.
- Use clear, professional icons representing different metrics and departments.
- Clean and structured layout with clear sections for different analytics categories.
- Subtle transitions and animations for a smooth user experience when loading data or switching views.