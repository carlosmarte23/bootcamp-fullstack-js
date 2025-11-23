import JobList from "./JobList";
import JobsInfo from "./JobsInfo";

export function JobListings() {
  return (
    <section className="search-results">
      <h2>Resultados de la búsqueda</h2>
      <JobsInfo />
      <JobList />
    </section>
  );
}
