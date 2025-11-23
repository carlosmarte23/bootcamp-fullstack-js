import styles from "./JobListings.module.css";

import { JobCard } from "./JobCard.jsx";
import { JobsInfo } from "./JobsInfo.jsx";

export function JobListings({ jobs }) {
  return (
    <section className={styles.searchResults}>
      <h2>Resultados de la búsqueda</h2>
      <JobsInfo />

      <div className={styles.jobList}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
