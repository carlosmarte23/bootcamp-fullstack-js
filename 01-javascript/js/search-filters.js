// search-filters.js

// Dictionary for job locations and their corresponding cities
const locationMap = {
  cdmx: "Ciudad de México",
  bsas: "Buenos Aires",
  bogota: "Bogotá",
  santiago: "Santiago de Chile",
  // Add more locations as needed
};

// Get filters container
const filtersContainer = document.querySelector(".jobs-search-filters");

// Declare filter variables
let filterTechnology;
let filterLocation;
let filterContractType;
let filterExperienceLevel;

// Ensure filters container exists
if (filtersContainer) {
  // Get filter input elements
  filterTechnology = document.getElementById("filter-technology");
  filterLocation = document.getElementById("filter-location");
  filterContractType = document.getElementById("filter-contract-type");
  filterExperienceLevel = document.getElementById("filter-experience");

  // Add event listeners to filter inputs
  filterTechnology.addEventListener("change", applyJobFilters);
  filterLocation.addEventListener("change", applyJobFilters);
  filterContractType.addEventListener("change", applyJobFilters);
  filterExperienceLevel.addEventListener("change", applyJobFilters);
}

// Function to apply filters to job listings
function applyJobFilters() {
  //Get selected filter values
  const selectedTechnology = filterTechnology.value.toLowerCase();
  let selectedLocation = filterLocation.value.toLowerCase();
  const selectedContractType = filterContractType.value.toLowerCase();
  const selectedExperienceLevel = filterExperienceLevel.value.toLowerCase();

  // Map location abbreviations to full city names if necessary
  if (locationMap[selectedLocation]) {
    selectedLocation = locationMap[selectedLocation].toLowerCase();
  }

  console.log("Selected Technology:", selectedTechnology);
  console.log("Selected Contract Type:", selectedContractType);
  console.log("Selected Experience Level:", selectedExperienceLevel);
  console.log("Selected Location:", selectedLocation);

  //Get all job listings
  const jobListings = document.querySelectorAll(".job-listing");
  //Loop through job listings and apply filters
  jobListings.forEach((job) => {
    const jobText = job.textContent.toLowerCase();

    //if no filter is selected, show all jobs
    if (
      selectedTechnology === "" &&
      selectedLocation === "" &&
      selectedContractType === "" &&
      selectedExperienceLevel === ""
    ) {
      job.style.display = "";
      return;
    }

    //check if job matches selected filters
    let matchesTechnology = false;
    let matchesLocation = false;
    let matchesContractType = false;
    let matchesExperienceLevel = false;

    //Apply filters logic
    if (jobText.includes(selectedTechnology)) {
      matchesTechnology = true;
    }

    if (jobText.includes(selectedLocation)) {
      matchesLocation = true;
    }

    if (jobText.includes(selectedContractType)) {
      matchesContractType = true;
    }

    if (jobText.includes(selectedExperienceLevel)) {
      matchesExperienceLevel = true;
    }

    //Determine if job should be displayed based on filter matches
    if (
      matchesTechnology &&
      matchesLocation &&
      matchesContractType &&
      matchesExperienceLevel
    ) {
      job.style.display = "";
    } else {
      job.style.display = "none";
    }
  });
}
