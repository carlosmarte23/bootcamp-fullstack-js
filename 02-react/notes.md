# Module 02 — React + Vite

The third module of the bootcamp introduces **React using Vite**.

I started by installing the required tools (Node and npm), then created a new React project using Vite. After setting up the environment, I cleaned the default template to keep only the essential files. From there, I rebuilt the job search page as an exact replica of the previous version, which will later be refactored into reusable React components.

Next, I started extracting the common structures of the web page, such as the Header and Footer, moving them into their own components to reuse across different pages. From there, I continued refactoring the job search page into a more modular structure, separating elements like the search form and the job list into independent components. Each component was paired with its own CSS module to improve code organization.

After completing the UI for the search page, I implemented the filtering system, added pagination, and created a reset filters button to improve usability.

Finally, I built a very simple custom routing system using a hook, allowing navigation between different pages within the project, starting with the Home and Search pages.

The last change before the exercises was to make a new custom hook to extract the logic of the searchform, this is to later use some of this logic in the form on the home page.

## Exercises

### 1. New page

Create a new page (Ill create the contact page) and add it as a new component with a new route and add it as a link in the header navbar.

#### 🟡 Last updated on November 29th, 2025.
