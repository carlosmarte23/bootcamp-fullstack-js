import { JobCard } from "./JobCard.jsx";
import { JobsInfo } from "./JobsInfo.jsx";

export function JobListings({ jobs }) {
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
