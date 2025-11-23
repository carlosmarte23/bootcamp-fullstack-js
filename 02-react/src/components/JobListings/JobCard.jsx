function JobCard({ job }) {
  const { titulo, empresa, ubicacion, descripcion } = job;

  return (
    <article className="job-card">
      <div className="job-title">
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
      </div>
      <a href="#" className="button btn-apply">
        Aplicar
      </a>
      <p>{descripcion}</p>
    </article>
  );
}

export default JobCard;
