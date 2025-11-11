// Button Apply State Change

const jobsDetailsSection = document.querySelector(".job-details");

if (jobsDetailsSection) {
  jobsDetailsSection.addEventListener("click", (event) => {
    const element = event.target;

    if (element.classList.contains("btn-apply")) {
      // event.preventDefault();
      console.log("Apply button clicked");

      // toggle all buttons
      const applyButtons = jobsDetailsSection.querySelectorAll(".btn-apply");
      console.log(applyButtons);

      applyButtons.forEach((button) => {
        button.textContent = "¡Aplicado!";
        button.classList.add("applied");
      });
    }
  });
}
