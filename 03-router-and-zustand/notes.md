# Module 03 — React Router + Zustand

The fourth module of the bootcamp introduces routing using **React Router**.

Right now, the app has a basic custom router that we made using the React components Link and Route, aswell as using the custom hook useRouter. In this module our task is to modify the app to use React Router instead of our custom router. This will bring a lot of benefits that we couldn't get with the custom router, such as using 404 pages, dynamic routes, protected routes, code splitting, and more.

React router has 3 different modes, for our case well use the simplest one, which is the browser router in declarative mode. In this mode we can declare routes and navigate between them.

Well modify our Link component to use React Router's Link component using an abstaction pattern design, so if later we need to change how the navigation works we can do it easily in a single place without needing to change all the Links components in all of our pages.

Well also going to change the navigateTo function in our useRouter hook to use instead React Router's useNavigate hook.

## Steps to migrate to React Router

- Step 1: Install React Router
- Step 2: Change our main.jsx file to use React Router
- Step 3: In App.jsx use the react-router Routes and Route components instead of our custom Route component
- Step 4: Integrate the react-router native hooks useNavigate and useLocation in our Link component using abstraction pattern. This will improve our app architecture maintaining the same external API that we have been using previously.
- Step 5: Modify the useRouter custom hook to implement react-router useNavigate hook's functions.

## Exercises
