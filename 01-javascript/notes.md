# Module 00 - HTML + CSS

The first exercise is to create the first two pages of the design for [DevJobs](https://stitch.withgoogle.com/projects/7508115667617706440?pli=1).

## Home page

#### 🟢 Completed on November 2nd 2025.

![](/00-html-css/Design/index.png)

First I looked at the design and divided the page in 3 sections, the header, the main part and the footer.

I then added the basic structure of the page in index.html using HTML semantic tags where needed and svg images from [tabler.io](https://tabler.io/icons) following the design.

I finished the styles for the index page, it took a while because I only have images so adjusting the exact sizes was a bit difficult. For the articles, I had to take a peek at the original code from miduDev because it wasn't aligning well for me, but everything else I did myself.

## Jobs search page

#### 🟢 Completed on November 4th 2025.

![](./Design/job%20search.png)

I started copying the basic structure of the home page, since the header and footer are the same and only the main content is changing. I created a new branch on github to test the workflow of a real development team.

After I finished the style of the page i did a test merging the changes of the feature branch and main, since i only did a small change it autoresolved, it was a little confusing because it was my first time doing it, but i fixed the duplicated lines and merged with main. Lastly to test PRs Im writting these notes, making a commit, and creating a PR.

# Module 01 - JAVASCRIPT

The second exercise is to add JavaScript to the job search page.
The first task is to add an event that filters the job listings using the select elements.

I started with the "filter-technology" select, then refactored the code into a single function to incorporate the other filters later on.

I feel that the current implementation isn’t very solid, to be honest, but since we don’t have a database yet and are simply filtering based on the text in the HTML, there isn’t much else I can do for now.

#### 🟢 Completed on November 8th 2025.

## Add jobs details page

#### 🟢 Completed on November 9th 2025.

![](./Design/job%20details.png)

The next task is to create the markup and styles for the Job Details page.
This page will be displayed when the user clicks the Apply button on any job listing from the Job Search page.

As with the Job Search page, I’ll start by copying the header and footer from the Home page and then building the markup for the main section of the page.

After the markup and styles are done, and since this is a front-end exercise for now without a database or routing logic, the goal is to simulate the user flow from the job listings page to a detailed job view.

In a real application, each job listing would have its own unique page or dynamic route (e.g., /jobs/:id) that loads the correct data from an API or database.

## Modifications to the jobs search page

### Step 0 — JSON Data Implementation (Preparation for exercises)

Before starting the next JavaScript exercises, I’m refactoring the project to load all job listings dynamically from a JSON file instead of hardcoded HTML.

This change will make the data easier to manage and allow me to work with filtering, searching, and pagination features just like in a real application that consumes an API.

🟢 Completed on November 9th 2025.

### Exercise 1 — Search by job title

The first exercise is adding real-time search functionality to the job listings page.
The goal is to allow users to filter jobs dynamically as they type in the search input.

🟢 Completed on November 10th 2025.

### Refactor – Filter Using Dataset Attributes

Before continuing, I noticed that the filters are still using the HTML text from the job cards instead of the data attributes coming from the JSON file. I created a branch to fix this, and once it's done, I’ll continue with the exercises.

After finishing these changes, the title filter now searches only the <h3> title, and the technology filter now searches only the article’s data-technology attribute instead of the whole text.

🟢 Completed on November 12th, 2025.

### Exercise 2 — Filter by Experience and Tech (advanced)

After the previous changes, I now need to implement the experience-level filter and an advanced version of the technology filter that supports selecting multiple options. I’ll start with the experience-level filter using the data attribute in the HTML, which is populated from the JSON file.

After doing this, I changed the UI from a select to a pseudo multi-select using checkboxes for better UX/UI, so the user can select multiple technologies for filtering jobs.

🟢 Completed on November 15th, 2025.

### Exercise 3 — Dynamic pagination

The pagination have to work on the jobs listing page, Since the JSON dataset doesn’t contain many entries, the pagination will be configured to display 3 jobs per page.

It have to show Previous and Next pages and highlight the current page.

🟡 Last updated on November 15th, 2025.
