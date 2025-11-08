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

// Filter Jobs by Select Inputs

const filterTechnology = document.getElementById("filter-technology");
// const filterLocation = document.getElementById("filter-location");
// const filterContractyType = document.getElementById("filter-contract-type");
// const filterExperienceLevel = document.getElementById("filter-experience");

filterTechnology.addEventListener("change", () => {
  const selectedTechnology = filterTechnology.value.toLowerCase();
  const jobListings = document.querySelectorAll(".job-listing");

  jobListings.forEach((job) => {
    const jobText = job.textContent.toLowerCase();

    //if no filter is selected, show all jobs
    if (selectedTechnology === "") {
      job.style.display = "";
      return;
    }

    if (jobText.includes(selectedTechnology)) {
      job.style.display = "";
    } else {
      job.style.display = "none";
    }
  });
});
