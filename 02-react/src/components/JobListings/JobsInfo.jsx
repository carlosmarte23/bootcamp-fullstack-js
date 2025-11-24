export function JobsInfo({ jobsCount }) {
  return (
    <div className="jobs-info" id="jobs-info">
      ¡Se encontraron{" "}
      <strong style={{ color: "var(--primary-light)" }}>{jobsCount}</strong>{" "}
      oportunidades!.
    </div>
  );
}
