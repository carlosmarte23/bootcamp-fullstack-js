// Button Apply State Change

const jobsListingsSection = document.querySelector(".job-listings");

jobsListingsSection.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("btn-apply")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("applied");
  }
});
