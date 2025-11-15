// search-filters.js

// Dictionary for job locations and their corresponding cities
const locationMap = {
  cdmx: "Ciudad de México",
  bsas: "Buenos Aires",
  bogota: "Bogotá",
  santiago: "Santiago de Chile",
  // Add more locations as needed
};

// Declare filter variables
let filtersTechnology;
let filterLocation;
let filterContractType;
let filterExperienceLevel;
let searchBar;
let techCheckoxes;

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

  // Add event listeners to filter inputs
  filterLocation.addEventListener("change", applyJobFilters);
  filterContractType.addEventListener("change", applyJobFilters);
  filterExperienceLevel.addEventListener("change", applyJobFilters);
  searchBar.addEventListener("input", applyJobFilters);
  filtersTechnology.forEach((checkbox) => {
    checkbox.addEventListener("change", applyJobFilters);
  });
}

// Toggle pseudo select
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
  //Get selected filter values
  let selectedLocation = filterLocation.value.toLowerCase();
  const selectedContractType = filterContractType.value.toLowerCase();

  // Map location abbreviations to full city names if necessary
  if (locationMap[selectedLocation]) {
    selectedLocation = locationMap[selectedLocation].toLowerCase();
  }

  //Get all job listings
  const jobListings = document.querySelectorAll(".job-listing");

  //Loop through job listings and apply filters
  jobListings.forEach((job) => {
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

    job.style.display = matchFilters ? "" : "none";
  });
}
