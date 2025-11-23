import data from "../../data/jobs.json";
import JobCard from "./JobCard";

function JobList() {
  const job1 = data[0];
  const job2 = data[1];
  const job3 = data[2];

  return (
    <div className="job-list">
      <JobCard job={job1} />
      <JobCard job={job2} />
      <JobCard job={job3} />
    </div>
  );
}

export default JobList;
