import styles from "./JobCard.module.css";

export function JobCard({ job }) {
  const { titulo, empresa, ubicacion, descripcion } = job;

  return (
    <article className={styles.jobCard}>
      <div className={styles.jobTitle}>
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
