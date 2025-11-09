fetch("./js/data/jobs.json")
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    const jobsContainer = document.getElementById("jobs-container");

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

      jobsContainer.appendChild(jobElement);
    });
  });
