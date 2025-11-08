// search-filters.js

// Button Apply State Change

const jobsListingsSection = document.querySelector(".job-listings");

jobsListingsSection.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("btn-apply")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("applied");
  }
});

// Filter Jobs Functionality
const filterTechnology = document.getElementById("filter-technology");
const filterLocation = document.getElementById("filter-location");
const filterContractyType = document.getElementById("filter-contract-type");
const filterExperienceLevel = document.getElementById("filter-experience");

//Get all job listings
const jobListings = document.querySelectorAll(".job-listing");

//Consolidate filters in one function
function applyJobFilters() {
  //Get selected filter values
  const selectedTechnology = filterTechnology.value.toLowerCase();
  const selectedLocation = filterLocation.value.toLowerCase();
  const selectedContractType = filterContractyType.value.toLowerCase();
  const selectedExperienceLevel = filterExperienceLevel.value.toLowerCase();

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
      console.log("No filters selected, showing all jobs");
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
      console.log("Location match found");
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

filterTechnology.addEventListener("change", applyJobFilters);
filterLocation.addEventListener("change", applyJobFilters);
filterContractyType.addEventListener("change", applyJobFilters);
filterExperienceLevel.addEventListener("change", applyJobFilters);
