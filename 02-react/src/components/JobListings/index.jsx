import { JobCard } from "./JobCard.jsx";
import { JobsInfo } from "./JobsInfo.jsx";

import data from "../../data/jobs.json";

const jobs = data.slice(0, 5);

export function JobListings() {
  return (
    <section className="search-results">
      <h2>Resultados de la búsqueda</h2>
      <JobsInfo />

      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
