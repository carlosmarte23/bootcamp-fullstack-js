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
  const selectedTechnology = filterTechnology.value.toLowerCase();
  //TODO: get other filter values

  //Loop through job listings and apply filters
  jobListings.forEach((job) => {
    const jobText = job.textContent.toLowerCase();

    //if no filter is selected, show all jobs
    if (selectedTechnology === "") {
      job.style.display = "";
      return;
    }

    //TODO: apply other filters logic

    if (jobText.includes(selectedTechnology)) {
      job.style.display = "";
    } else {
      job.style.display = "none";
    }
  });
}

filterTechnology.addEventListener("change", applyJobFilters);
