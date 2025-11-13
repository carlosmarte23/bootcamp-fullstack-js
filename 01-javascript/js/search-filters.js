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
let filterTechnology;
let filterLocation;
let filterContractType;
let filterExperienceLevel;
let searchBar;

// Get filters container
const filtersContainer = document.querySelector(".jobs-search-filters");

// Ensure filters container exists
if (filtersContainer) {
  // Get filter input elements and search bar
  filterTechnology = document.getElementById("filter-technology");
  filterLocation = document.getElementById("filter-location");
  filterContractType = document.getElementById("filter-contract-type");
  filterExperienceLevel = document.getElementById("filter-experience");
  searchBar = document.getElementById("jobs-search-input");

  // Add event listeners to filter inputs
  filterTechnology.addEventListener("change", applyJobFilters);
  filterLocation.addEventListener("change", applyJobFilters);
  filterContractType.addEventListener("change", applyJobFilters);
  filterExperienceLevel.addEventListener("change", applyJobFilters);
  searchBar.addEventListener("input", applyJobFilters);
}

// Function to apply filters to job listings
function applyJobFilters() {
  //Get selected filter values
  const selectedTechnology = filterTechnology.value.toLowerCase();
  let selectedLocation = filterLocation.value.toLowerCase();
  const selectedContractType = filterContractType.value.toLowerCase();
  const selectedExperienceLevel = filterExperienceLevel.value.toLowerCase();
  const searchQuery = searchBar.value.toLowerCase();

  // Map location abbreviations to full city names if necessary
  if (locationMap[selectedLocation]) {
    selectedLocation = locationMap[selectedLocation].toLowerCase();
  }

  //Get all job listings
  const jobListings = document.querySelectorAll(".job-listing");

  //Loop through job listings and apply filters
  jobListings.forEach((job) => {
    const jobText = job.textContent.toLowerCase();

    // TITLE FILTER
    let matchesSearchQuery = true;

    const titleElement = job.querySelector(".job-listing-title h3");
    const jobTitle = titleElement ? titleElement.textContent.toLowerCase() : "";

    if (searchQuery !== "") {
      matchesSearchQuery = jobTitle.includes(searchQuery);
    }
    // TECHNOLOGY FILTER
    let matchesTechnology = true;

    const techDataset = (job.dataset.technology || "").toLowerCase().trim();
    // const techAttribute = techDataset.split(",").map((t) => t.trim());
    const techAttr = techDataset
      ? techDataset.split(",").map((t) => t.trim())
      : [];

    if (selectedTechnology !== "") {
      matchesTechnology = techAttr.includes(selectedTechnology);
    }

    // EXPERIENCE FILTER
    let matchesExperienceLevel = true;
    const expDataset = (job.dataset.level || "").toLowerCase().trim();

    if (selectedExperienceLevel !== "") {
      matchesExperienceLevel = expDataset.includes(selectedExperienceLevel);
    }

    //check if job matches selected filters
    let matchesLocation = true;
    let matchesContractType = true;

    //Apply filters logic

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
