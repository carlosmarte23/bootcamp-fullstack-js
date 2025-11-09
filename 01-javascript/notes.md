# Module 00 - HTML + CSS

The first exercise is to create the first two pages of the design for [DevJobs](https://stitch.withgoogle.com/projects/7508115667617706440?pli=1).

## Design

### Home page

#### 🟢 Completed on November 2nd 2025.

![](/00-html-css/Design/index.png)

First I looked at the design and divided the page in 3 sections, the header, the main part and the footer.

I then added the basic structure of the page in index.html using HTML semantic tags where needed and svg images from [tabler.io](https://tabler.io/icons) following the design.

I finished the styles for the index page, it took a while because I only have images so adjusting the exact sizes was a bit difficult. For the articles, I had to take a peek at the original code from miduDev because it wasn't aligning well for me, but everything else I did myself.

### Jobs search page

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

### Jobs details page

#### 🟡 Working on it - Last update November 8th 2025.

![](./Design/job%20details.png)

The next task is to create the markup and styles for the Job Details page.
This page will be displayed when the user clicks the Apply button on any job listing from the Job Search page.

As with the Job Search page, I’ll start by copying the header and footer from the Home page and then building the markup for the main section of the page.
