# Module 03 — React Router + Zustand

The fourth module of the bootcamp introduces routing using **React Router**.

Right now, the app has a basic custom router that we made using the React components `Link` and `Route`, as well as a custom hook called `useRouter`.

In this module, our task is to modify the app to use **React Router** instead of our custom router. This brings a lot of benefits we couldn’t easily get before, like:

- 404 pages
- dynamic routes
- protected routes
- code splitting
- and more

## React Router mode used in this module

React Router has different ways to handle routing. For our case, we’ll use the simplest one: **Browser Router (declarative mode)**.

With this mode we can declare routes and navigate between them in a clean, standard way.

## Migration plan (keeping our architecture clean)

We’ll modify our `Link` component to use React Router’s `Link` internally, using an **abstraction pattern**. That way, if later we want to change how navigation works, we can do it in a single place without updating all the `Link` usage across the app.

We’ll also update the `navigateTo` function in our `useRouter` hook, replacing it with React Router’s `useNavigate`.

## Steps to migrate to React Router

- **Step 1:** Install React Router
- **Step 2:** Update `main.jsx` to use React Router
- **Step 3:** In `App.jsx`, use React Router’s `Routes` and `Route` instead of our custom `Route`
- **Step 4:** Integrate React Router native hooks (`useNavigate`, `useLocation`) inside our `Link` component using the abstraction pattern  
  This keeps the same external API we already use in the app, but improves the architecture.
- **Step 5:** Modify the `useRouter` custom hook to use React Router’s `useNavigate` functions

## Implement the job detail page with a dynamic route

Now that we are using React Router, we can easily implement **dynamic routes**.

In our case, the job detail page will use a job id, so we can migrate the previously created job detail page that we built using only HTML.

### Route

- `/jobs/:id`

### API used

The data for each job is located in an external API, fetched with:

- `https://jscamp-api.vercel.app/api/jobs/{job-id}`

After doing all of these changes our app is in a much better state! But there is still one issue, we are building the searchParams manually and using windows.location.path to build the URL. We can do better with React Router. Its now time to use the useSearchParams hook and the useLocation hook.

## Lazy loading pages

Our app is now using React Router, one new improvement that we can do is **lazy loading pages**. That means, only load the page when it is needed (right now, when our home is loaded, all the other pages are also downloaded). For this we can use React lazy and React Suspense.

In our case, we are using React lazy to lazy load the pages. We can also use React Suspense to show a loading spinner, custom message, or whatever we want while the page is being loaded.

## Add active status to links

For this, we'll use the `NavLink` component from React Router replacing our `Link` component with an abstraction pattern.

## Responsive UI refactor (CSS Modules cleanup)

After the routing migration, I refactored the UI layer to be fully responsive and more maintainable by moving page-specific styles out of `index.css` and into **CSS Modules**. This reduced global CSS noise, avoided class name collisions, and made it easier to iterate on each page/component independently.

### Pages updated

- **Home page**

  - Migrated `.hero`, `.features`, and the search form styles into `Home.module.css`.
  - Added responsive rules for smaller screens (hero height, typography, and layout tweaks).

- **Search page**

  - Added `Search.module.css` and replaced inline styles with module classes.
  - Improved spacing/layout for results and empty state.
  - Updated the whole Search “system” to be mobile-friendly (filters, list, pagination).

- **Job detail page**

  - Refactored layout to support wider screens while staying clean on mobile.
  - Made header/actions/footer stack properly on small screens.
  - Unified apply button styling using a shared `.button-apply` class and added a larger footer apply button.

- **Contact page**

  - Added responsive layout rules for the form + sidebar to collapse into one column.
  - Improved text wrapping/line-height for better readability on small screens.

### Components updated

- **Header**

  - Made header responsive by stacking logo/nav/actions on mobile.

- **Job listings**

  - Updated `JobCard` layout to switch to a single-column layout on mobile.
  - Added responsive spacing and ensured action buttons behave correctly on small screens.
  - Added `JobsInfo.module.css` and moved styling out of global classes.

- **SearchForm**

  - Improved the search bar layout and made filters stack vertically on mobile.
  - Added a CSS Module for `TechFilter` and moved the dropdown styles there.
  - Added responsive dropdown sizing for smaller viewports.

- **Pagination**

  - Refactored active state styling into CSS Modules (`isActive`).
  - Added horizontal scroll behavior for pagination links on mobile.

### Global CSS cleanup

- Removed large blocks of page-specific styles from `index.css`.
- Kept only truly global styles and introduced a reusable `.button-apply` utility class.

## Authentication

Our next step is to implement authentication. Our long-term goal is to use a global state management library like **Zustand**, but we will start simple. First, since there isn't an API for authentication, we will use a simple in-memory authentication system simulating a login/logout button first using a state. Then, we will progress to the global state management using **React Context** with the hook useContext. Finally, we will prepare our app to use zustand by creating our custom hook useAuth.
