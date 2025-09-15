# Shopify Insights App 📊

A Next.js application that provides insights and analytics for Shopify store owners. This app allows users to connect their Shopify stores, fetch data, and visualize key metrics to make data-driven decisions. It offers features like tenant management, data synchronization, and insightful dashboards.

## 🚀 Key Features

- **Tenant Management**: Easily onboard and manage multiple Shopify stores (tenants).
- **Shopify Data Sync**: Fetch products, customers, and orders from Shopify stores.
- **Data Visualization**: Visualize key metrics and trends using charts and graphs.
- **Authentication**: Secure user authentication using magic links.
- **Insights Dashboard**: Get a summary of key data insights for each tenant.
- **Store Selection**: Allows users to select a specific store to view data for.
- **User-Friendly Interface**: Intuitive and easy-to-use interface for seamless navigation.

## 🛠️ Tech Stack

*   **Frontend**:
    *   [Next.js](https://nextjs.org/) - React framework for building performant web applications.
    *   [React](https://reactjs.org/) - JavaScript library for building user interfaces.
    *   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
    *   [Lucide React](https://lucide.dev/) - Beautifully simple icons.
    *   [Recharts](https://recharts.org/) - Composable charting library built on React components 
    *   [Framer Motion](https://www.framer.com/motion/) - Animation library for React 
    *   [React Datepicker](https://reactdatepicker.com/) - A simple and customizable datepicker component for React 

*   **Backend**:
    *   [Node.js](https://nodejs.org/en) (Likely, based on API structure)
    *   [Express](https://expressjs.com/) (Likely, based on API structure)

*   **Database**:
    *   [Supabase](https://supabase.com/) - Cloud-based database and authentication platform.

*   **Authentication**:
    *   [Supabase Auth](https://supabase.com/auth) - Authentication service provided by Supabase.

*   **Data Fetching**:
    *   [@tanstack/react-query](https://tanstack.com/query/latest) - Powerful asynchronous state management for React.
    *   [Axios](https://axios-http.com/docs/intro) - Promise based HTTP client for the browser and node.js

*   **Build Tools**:
    *   [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing.
    *   [ESLint](https://eslint.org/) - JavaScript linting tool.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>=18)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Supabase Account](https://supabase.com/)
- [Shopify Store](https://www.shopify.com/)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install
    ```

3.  Set up environment variables:

    *   Create a `.env.local` file in the root directory.
    *   Add the following environment variables, replacing the placeholders with your actual values:

        ```
        NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
        NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
        NEXT_PUBLIC_API_BASE=http://localhost:4000 # or your backend API URL
        ```

    *   Obtain your Supabase URL and anonymous key from your Supabase project dashboard.

4.  Configure Supabase:

    *   Enable email authentication in your Supabase project.
    *   Set up the necessary database tables and functions for your application.

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## 💻 Usage

1.  **Login**: Visit the `/login` page and enter your email address to receive a magic link.
2.  **Onboard Tenant**: After logging in, navigate to the `/tenants` page to add a new Shopify store. You'll need the store name, shop domain, and access token.
3.  **View Dashboard**: Once the tenant is registered, you'll be redirected to the `/dashboard` to view insights and analytics for the selected store.
4.  **Select Store**: Use the store selector in the header to switch between different Shopify stores.

## 📂 Project Structure

```
shopify-insights-app/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page (currently commented out)
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── tenants/
│   │   └── page.tsx          # Tenant onboarding page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── Layout.tsx            # Main layout component
│   └── Providers.tsx         # Context providers
├── context/
│   ├── AuthContext.tsx       # Authentication context
│   └── TenantContext.tsx     # Tenant context
├── lib/
│   ├── api.ts                # API client
│   └── supabaseClient.ts     # Supabase client
├── next.config.js            # Next.js configuration
├── public/
│   └── ...
├── styles/
│   └── globals.css           # Global styles
└── tsconfig.json             # TypeScript configuration
```



## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.


