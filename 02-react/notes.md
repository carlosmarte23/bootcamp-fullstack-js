# Module 02 — React + Vite

The third module of the bootcamp introduces **React using Vite**.

I started by installing the required tools (Node and npm), then created a new React project using Vite. After setting up the environment, I cleaned the default template to keep only the essential files. From there, I rebuilt the job search page as an exact replica of the previous version, which will later be refactored into reusable React components.

Next, I started extracting the common structures of the web page, such as the Header and Footer, moving them into their own components to reuse across different pages. From there, I continued refactoring the job search page into a more modular structure, separating elements like the search form and the job list into independent components. Each component was paired with its own CSS module to improve code organization.

After completing the UI for the search page, I implemented the filtering system, added pagination, and created a reset filters button to improve usability.

Finally, I built a very simple custom routing system using a hook, allowing navigation between different pages within the project, starting with the Home and Search pages.

The last change before the exercises was to make a new custom hook to extract the logic of the searchform, this is to later use some of this logic in the form on the home page.

## Exercises

### 1 & 2. New route and contacts page form

For this exercise, I added a new Contact page to the project and integrated it into the existing navigation system. I created the Contact component inside src/pages/ and connected it to the router by adding a new route (/contact) in App.jsx. I also updated the Header component to include a “Contact” link using React Router’s Link component, ensuring the navigation keeps SPA behavior without full page reloads. While updating the navigation, I also fixed a small issue by removing a duplicated navbar entry.

On the Contact page itself, I built the complete form markup and layout, using CSS Modules (Contact.module.css) to scope styles locally and keep the project structure clean and maintainable. The layout follows a common support-page pattern, with a main section for the form and a sidebar that displays alternative contact information such as email and phone number.

Next, I implemented the React logic required by the exercise. The form manages local state for its input values as well as the submission status. I added field-level validations for name, email, subject, and message, generating an errors object and displaying contextual error messages below the corresponding inputs. When a field has an error, its input style changes to visually highlight the issue.

To simulate form submission, the submit button transitions through different states (idle → submitting → success), updating both its text and styles. While the form is “submitting”, user interaction is disabled to prevent multiple submissions. I also used useId() to correctly associate each label with its corresponding input, improving accessibility.

### 3. Improve Link component

Now we have to improve the link component with the following changes:

- Detect if its href matches the current path.
- Adds a class "active" to the link if it matches the current path.
- Works with out developers configuring anything.

Nice to have:

- Animation between changing active links.
- Partial matching url for nested routes.
- Responsive styling.
- Accessibility. Add "aria-current" to the link if it matches the current path.

🟢 Completed on December 14th, 2025.

## Fetch from API

Right now we load the jobs from a local JSON file, now its time to fetch from a remote API. The base url for this is [JSCamp API](https://jscamp-api.vercel.app/api/jobs) and for the documentation for it [check the docs in the lesson](https://www.jscamp.dev/introduccion-a-react/llamada-a-la-api).

Ill start making a new branch, before doing the fetch with the API I'll start fixing some bugs with the search form. Also i'll add a new useFilters hook on the Search page for better separation of concerns.

🟡 Last updated on December 14th, 2025.
