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

    // Get job title for search bar filtering
    const titleElement = job.querySelector(".job-listing-title h3");

    const jobTitle = titleElement ? titleElement.textContent.toLowerCase() : "";

    //check if job matches selected filters
    let matchesTechnology = true;
    let matchesLocation = true;
    let matchesContractType = true;
    let matchesExperienceLevel = true;
    let matchesSearchQuery = true;

    //Apply filters logic
    if (selectedTechnology !== "") {
      matchesTechnology = jobText.includes(selectedTechnology);
    }

    if (selectedLocation !== "") {
      matchesLocation = jobText.includes(selectedLocation);
    }

    if (selectedContractType !== "") {
      matchesContractType = jobText.includes(selectedContractType);
    }

    if (selectedExperienceLevel !== "") {
      matchesExperienceLevel = jobText.includes(selectedExperienceLevel);
    }

    if (searchQuery !== "") {
      matchesSearchQuery = jobTitle.includes(searchQuery);
    }

    //Determine if job should be displayed based on filter matches
    const matchFilters =
      matchesTechnology &&
      matchesLocation &&
      matchesContractType &&
      matchesExperienceLevel &&
      matchesSearchQuery;

    job.style.display = matchFilters ? "" : "none";

    //   job.style.display = "";
    //   console.log("Showing job:", jobTitle);
    // } else {
    //   job.style.display = "none";
    // }
  });
}
