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

Right now we load the jobs from a local JSON file, so the next step was to fetch them from a remote API. The base url for this is [JSCamp API](https://jscamp-api.vercel.app/api/jobs) and for the documentation for it [check the docs in the lesson](https://www.jscamp.dev/introduccion-a-react/llamada-a-la-api).

Before implementing the fetch, I adjusted the SearchForm and useSearchForm logic to properly align with the API contract. This included renaming filters so they match the expected query parameters (technology, type, and level), removing the contract filter since it is not supported by the API, and refactoring the form so filters are applied automatically on change instead of relying on a manual submit. I also fixed how the search text is handled to keep it consistent with the API behavior.

After that, I refactored the Search page by extracting its state management into a small custom hook called useFilters. This hook centralizes the filters, search query, and current page state, making it easier to trigger a new search and automatically reset pagination back to page 1 whenever filters or the search text change.

Once the state flow was in place, I replaced the local JSON loading with a real API request using useEffect. The fetch builds the query string using URLSearchParams, sending the active filters and search text as parameters. Pagination is handled through the limit and offset parameters, and the total value returned by the API is used to calculate the total number of pages.

To improve the user experience, I added a loading state to indicate when jobs are being fetched and an empty state for cases where no results match the current filters. I also improved the Pagination component by disabling the previous and next controls when the user is on the first or last page, including a dedicated CSS module class for the disabled state.

🟢 Completed on December 18th, 2025.

## Exercises (Improving the app)

### 1. Clear filters button

#### 1.1 Dont show when no filters are applied

- Use a function or helper to check if any filters are applied
- Use conditional rendering to hide the button when no filters are applied

#### 1.2 Create function handleClearFilters

- Clear all filters
- Reset state to inital values
- Reset pagination (optional)

#### 1.3 Show button when filters are applied

- Only shows in DOM when there are active filters use && operator for conditional rendering

🟢 Completed on December 18th, 2025.

### 2. Loading spinner

- Replace loading text with a spinner component to improve user experience.

🟢 Completed on December 18th, 2025.

### 3. Saving filters to LocalStorage

- Use useEffect to save filters to LocalStorage when they change.
- Use useEffect to load filters from LocalStorage when the page mounts.

🟢 Completed on December 23rd, 2025.

### 4. Error handling

- Add a new error state to store API error messages. (TODO HERE)
- Wrap the fetch logic in a try-catch-finally block.
- Verify response.ok before processing the response and threw an error when the request failed.
- Display a user-friendly error message using conditional rendering.
- Add a retry option to allow the user to recover from failed requests.
- Improve error feedback by handling offline scenarios and common HTTP errors.

🟢 Completed on December 24th, 2025.

## Extra improvements

### 1. Add title to each page using React

- Use the title tag to set the title of each page dinamically.

🟢 Completed on December 24th, 2025.

## Extra improvements

### 2. Add debounce to the search bar input to improve performance

- Use useRef to create a new variable to store a debounce timer.
- Use useEffect to clear the debounce timer when the input value changes.
- Use useEffect to trigger the search when the input value changes after a debounce delay.

🟢 Completed on December 25th, 2025.

### 3. Sync form values with the URL and vice versa

- Change URL when filters changes.
- Change Url when page changes.
- When refresh, get values from URL and set them to the form.
- Make sure when user types in the form, on the Home page, the filters and the URL are updated.

This way we can use the URL as a single source of truth for the form values.

🟢 Completed on December 25th, 2025.
