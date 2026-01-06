# AI Development Rules

MAKE SURE TO IMPLEMENT THE CHANGES IN A NON DESTRUCTIVE WAY MAINTAINING CoODEBASE FUNCTIONALITY AND UI/UX DESIGN and always ensure complete responsivity across all view ports!

## Tech Stack Overview

The application will be built using a modern, component-based architecture to ensure scalability, maintainability, and performance.

*   **Frontend Framework:** React
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Build Tool/Bundler:** Vite
*   **Routing:** React Router DOM
*   **Server State Management:** TanStack Query (React Query)
*   **Client State Management:** React Hooks (useState, useContext, useReducer)
*   **Linting/Formatting:** ESLint and Prettier
*   **HTTP Client:** Native `fetch` or `axios`

## Library and Usage Rules

To maintain consistency and avoid dependency bloat, adhere strictly to the following library usage rules:

1.  **Language:** All application logic, components, and hooks **must** be written in **TypeScript**. Avoid using plain JavaScript (`.js` or `.jsx`) files.
2.  **UI Framework:** Use **React** for all component development. Functional components and Hooks are mandatory; class components are forbidden.
3.  **Styling:** **Tailwind CSS** is the exclusive styling solution. Do not use custom CSS files, CSS modules, or any CSS-in-JS libraries (e.g., Styled Components, Emotion). All styling must be applied via Tailwind utility classes.
4.  **Server State Management:** **TanStack Query (React Query)** is mandatory for managing all asynchronous data fetching, caching, synchronization, and updates (mutations). Do not use `useState` or `useEffect` for managing server-side data.
5.  **Client State Management:** Use standard **React Hooks** (`useState`, `useReducer`, `useContext`) for simple, local component state. For complex global state, a lightweight library like Zustand or Jotai may be introduced, but only after explicit approval.
6.  **Routing:** Use **React Router DOM** for all client-side navigation and routing logic.
7.  **HTTP Client:** Use the native `fetch` API or `axios` for making HTTP requests. These clients should only be called within the query functions provided to TanStack Query hooks.
8.  **Component Structure:** Components should be small, focused, and follow the principle of separation of concerns (e.g., container components for logic, presentational components for UI).
9.  **Accessibility:** All components must adhere to WCAG standards. Ensure proper use of semantic HTML, ARIA attributes, and keyboard navigation support.

MAKE SURE TO IMPLEMENT THE CHANGES IN A NON DESTRUCTIVE WAY MAINTAINING CoODEBASE FUNCTIONALITY AND UI/UX DESIGN and always ensure complete responsivity across all view ports!