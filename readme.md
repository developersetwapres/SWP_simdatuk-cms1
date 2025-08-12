![Logo](images/logo.svg)

# Content Management System (CMS)

This is a Next.js web application that serves as a Content Management System (CMS) for SIMDATUK (Sistem Informasi Manajemen Data Dukungan Kepegawaian) - the Human Resource Data Management Information System for the Secretariat of the Vice President of Indonesia.

## Table of Contents

[[_TOC_]]

## Features

- **Authentication:** Secure login with 2FA, password reset, and Google reCAPTCHA integration
- **Dashboard:** Comprehensive overview with employee statistics and interactive charts
- **Employee Data Management:** Manage ASN, Non-ASN, and outsourcing employee data
- **Data Visualization:** Interactive charts showing demographics, education, and generational data
- **Permission-based Access Control:** Role-based route protection and user permissions
- **Export Functionality:** Generate reports and export data in various formats
- **Security:** JWT authentication, data encryption, and HTTP security headers

## Technology Stack

- **Framework:** Next.js 12.0.7 with React 17.0.2
- **State Management:** Redux with Redux Saga for side effects
- **UI Library:** Material-UI (MUI) v5 with Emotion for styling
- **Form Handling:** Formik with Yup validation
- **Charts & Visualization:** Chart.js with react-chartjs-2
- **Authentication:** JWT-based with 2FA support and Google reCAPTCHA
- **API Communication:** Axios with custom interceptors
- **Data Processing:** html2canvas, jspdf for exports
- **Security:** crypto-js for encryption, HTTP security headers

## Project Structure

The project follows a standard Next.js and React structure with Redux state management:

```
.
├── components/           # Reusable React components, divided by feature
│   ├── Auth/            # Authentication components (Login, 2FA, Reset Password)
│   ├── Dashboard/       # Dashboard-specific components and charts
│   ├── DataPegawai/     # Employee data management components
│   ├── core/            # Core app components (Layout, Navigation, Appbar)
│   └── shared/          # Shared components (WithAuth, Modals, Forms)
├── containers/          # Redux-connected container components
├── pages/               # Next.js file-based routing
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Dashboard pages
│   ├── data-pegawai/    # Employee data pages
│   └── rekapitulasi/    # Report and summary pages
├── store/               # Redux store setup
│   ├── actions/         # Redux actions
│   ├── reducers/        # Redux reducers
│   ├── sagas/           # Redux saga middleware
│   └── constants.js     # Action type constants
├── utils/               # Helper functions and utilities
│   ├── interceptors.js  # Axios configuration and interceptors
│   ├── storage.js       # Local storage utilities
│   ├── crypt.js         # Encryption utilities
│   └── theme.js         # Material-UI theme configuration
├── hooks/               # Custom React hooks
├── data/                # JSON data files for various departments
└── environment/         # Environment configuration files
```

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- ESLint (latest version)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://git.ekuator.id/project/setneg/simdatuk/cms
   cd cms
   ```

2. **Set up environment variables:**
   ```sh
   cp environment/development .env.local
   ```
   - Adjust the values in the `.env.local` file for your environment
   - Available environment templates in `/environment/` directory

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Run the application:**
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:3000`