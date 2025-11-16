// App state
const PAGE_SIZE = 3;
let currentPage = 1;
let allJobsListings = [];
let filteredJobs = [];

// Pagination

const paginationPrev = document.getElementById("pagination-prev");
const paginationNext = document.getElementById("pagination-next");
const paginationPages = document.getElementById("pagination-pages");
const jobsInfoContainer = document.getElementById("jobs-info");

// Link pagination previous and next events
if (paginationPrev) {
  paginationPrev.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage--;
    if (currentPage < 1) currentPage = 1;
    renderpage(currentPage);
  });
}
if (paginationNext) {
  paginationNext.addEventListener("click", (e) => {
    e.preventDefault();
    const lastPage = Math.ceil(filteredJobs.length / PAGE_SIZE);
    currentPage++;
    if (currentPage > lastPage) currentPage = lastPage;
    renderpage(currentPage);
  });
}

//Jobs listings fetch

// Get jobs container
const jobsContainer = document.getElementById("jobs-container");

// Ensure jobs container exists
if (jobsContainer) {
  // Fetch job data from JSON file and render jobs
  fetch("./js/data/jobs.json")
    .then((response) => {
      return response.json();
    })
    .then((jobs) => {
      jobs.forEach((job) => {
        // Create job article element
        const jobElement = document.createElement("article");
        jobElement.classList.add("job-listing");

        // Add data atributes and inner HTML
        jobElement.setAttribute("data-technology", job.data.technology);
        jobElement.setAttribute("data-location", job.data.modalidad);
        jobElement.setAttribute("data-level", job.data.nivel);

        jobElement.innerHTML = ` 
      <div class="job-listing-title">
        <h3>${job.titulo}</h3>
        <small>${job.empresa} | ${job.ubicacion}</small>
      </div>

      <a href="./job-details.html" class="button btn-apply">Aplicar</a>
      <p>
        ${job.descripcion}
      </p>
      `;

        // Hide job by default
        jobElement.style.display = "none";

        // Append job element to jobs container
        jobsContainer.appendChild(jobElement);
      });

      // Save all jobs data
      allJobsListings = Array.from(document.querySelectorAll(".job-listing"));

      // Render first page
      renderpage(1);
    });
}

// Filter jobs

// Dictionary for job locations and their corresponding cities
const locationMap = {
  cdmx: "Ciudad de México",
  bsas: "Buenos Aires",
  bogota: "Bogotá",
  santiago: "Santiago de Chile",
  // Add more locations as needed
};

// Declare filter element variables
let filtersTechnology;
let filterLocation;
let filterContractType;
let filterExperienceLevel;
let searchBar;
let clearFiltersBtn;

// Pseudo select variables
const techFilter = document.querySelector(".filter-tech");
const techToggle = document.getElementById("filter-tech-toggle");

// Get filters container
const filtersContainer = document.querySelector(".jobs-search-filters");

// Ensure filters container exists
if (filtersContainer) {
  // Get select filters elements and search bar
  filterLocation = document.getElementById("filter-location");
  filterContractType = document.getElementById("filter-contract-type");
  filterExperienceLevel = document.getElementById("filter-experience");
  searchBar = document.getElementById("jobs-search-input");
  filtersTechnology = document.querySelectorAll('input[name="filter-tech"]');

  clearFiltersBtn = document.getElementById("clear-filters");

  // Add event listeners to filter inputs
  filterLocation.addEventListener("change", () => renderpage());
  filterContractType.addEventListener("change", () => renderpage());
  filterExperienceLevel.addEventListener("change", () => renderpage());
  searchBar.addEventListener("input", () => renderpage());
  filtersTechnology.forEach((checkbox) => {
    checkbox.addEventListener("change", () => renderpage());
  });

  // Add event listener to clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // clear inputs and selects
      if (searchBar) searchBar.value = "";
      if (filterLocation) filterLocation.value = "";
      if (filterContractType) filterContractType.value = "";
      if (filterExperienceLevel) filterExperienceLevel.value = "";

      // Uncheck technologies
      if (filtersTechnology)
        filtersTechnology.forEach((checkbox) => {
          checkbox.checked = false;
        });

      // Close pseudo select if open
      if (techFilter) techFilter.classList.remove("is-open");

      // Reset page and render
      renderpage(1);
    });
  }
}

// Toggle pseudo select event listener
if (techFilter && techToggle) {
  techFilter.addEventListener("click", () => {
    techFilter.classList.add("is-open");
  });

  document.addEventListener("click", (event) => {
    if (!techFilter.contains(event.target)) {
      techFilter.classList.remove("is-open");
    }
  });
}

// Function to apply filters to job listings
function applyJobFilters() {
  filteredJobs = [];
  //Get selected filter values
  let selectedLocation = filterLocation.value.toLowerCase();
  const selectedContractType = filterContractType.value.toLowerCase();

  // Map location abbreviations to full city names if necessary
  if (locationMap[selectedLocation]) {
    selectedLocation = locationMap[selectedLocation].toLowerCase();
  }

  //Loop through job listings and apply filters
  allJobsListings.forEach((job) => {
    const jobText = job.textContent.toLowerCase();

    // Validation variables
    let matchesSearchQuery = true;
    let matchesTechnology = true;
    let matchesExperienceLevel = true;
    let matchesLocation = true;
    let matchesContractType = true;

    // TITLE FILTER
    const searchQuery = searchBar.value.toLowerCase();

    const titleElement = job.querySelector(".job-listing-title h3");
    const jobTitle = titleElement ? titleElement.textContent.toLowerCase() : "";

    if (searchQuery !== "") {
      matchesSearchQuery = jobTitle.includes(searchQuery);
    }
    // TECHNOLOGY FILTER
    const selectedTechnologies = Array.from(filtersTechnology)
      .filter((check) => check.checked)
      .map((check) => check.value.toLowerCase());

    const techDataset = (job.dataset.technology || "").toLowerCase().trim();
    const techAttr = techDataset
      ? techDataset.split(",").map((t) => t.trim())
      : [];

    if (selectedTechnologies.length > 0) {
      matchesTechnology = techAttr.some((tech) =>
        selectedTechnologies.includes(tech)
      );
    }

    // EXPERIENCE FILTER
    const selectedExperienceLevel = filterExperienceLevel.value.toLowerCase();

    const expDataset = (job.dataset.level || "").toLowerCase().trim();

    if (selectedExperienceLevel !== "") {
      matchesExperienceLevel = expDataset.includes(selectedExperienceLevel);
    }

    if (selectedLocation !== "") {
      matchesLocation = jobText.includes(selectedLocation);
    }

    if (selectedContractType !== "") {
      matchesContractType = jobText.includes(selectedContractType);
    }

    //Determine if job should be displayed based on filter matches
    const matchFilters =
      matchesTechnology &&
      matchesLocation &&
      matchesContractType &&
      matchesExperienceLevel &&
      matchesSearchQuery;

    // Saves only jobs that match filters

    if (matchFilters) {
      filteredJobs.push(job);
    }
  });
}

function renderpage(page = 1) {
  // Filter jobs based on selected filters
  applyJobFilters();

  // Reset all jobs to hidden
  allJobsListings.forEach((job) => {
    job.style.display = "none";
  });

  // Show filtered jobs on current page
  let start = (page - 1) * PAGE_SIZE;
  let end = page * PAGE_SIZE;

  filteredJobs.slice(start, end).forEach((job) => {
    job.style.display = "";
  });

  // Update current page number
  currentPage = page;

  // update pagination
  updatePagination();

  // update jobs counter
  updateJobsCounter();

  // update reset filters button
  updateResetFiltersButton();
}

function updateResetFiltersButton() {
  let hasfilters =
    searchBar.value.trim() !== "" ||
    filterLocation.value !== "" ||
    filterContractType.value !== "" ||
    filterExperienceLevel.value !== "" ||
    Array.from(filtersTechnology).some((cb) => cb.checked);

  if (hasfilters) {
    clearFiltersBtn.classList.remove("disabled");
  } else {
    clearFiltersBtn.classList.add("disabled");
  }
}

function updateJobsCounter() {
  if (jobsInfoContainer) {
    jobsInfoContainer.innerHTML = "";
    let jobsInfoElement = document.createElement("p");
    let html = "";
    if (filteredJobs.length === 0) {
      html = "Actualmente no tenemos trabajos con esas características";
    } else if (filteredJobs.length === 1) {
      html = `¡Encontramos <span>1</span> oportunidad para ti!`;
    } else {
      html = `¡Encontramos <span>${filteredJobs.length}</span> oportunidades para ti!`;
    }

    jobsInfoElement.innerHTML = html;
    jobsInfoContainer.appendChild(jobsInfoElement);
  }
}

function updatePagination() {
  // // Calculate number of pages
  const numPages = Math.ceil(filteredJobs.length / PAGE_SIZE);

  // Update previous and next button states
  paginationPrev.setAttribute(
    "aria-disabled",
    currentPage === 1 ? "true" : false
  );
  paginationNext.setAttribute(
    "aria-disabled",
    currentPage === numPages ? "true" : false
  );

  // Create pagination buttons
  paginationPages.innerHTML = "";

  for (let i = 1; i <= numPages; i++) {
    const btn = document.createElement("a");
    btn.classList.add("button");
    btn.classList.add("pagination-link");
    btn.textContent = i;

    if (i === currentPage) {
      btn.classList.add("is-active");
    }
    btn.addEventListener("click", () => {
      currentPage = i;
      renderpage(i);
    });
    paginationPages.appendChild(btn);
  }
}
