import { Link } from "../Link";
import styles from "./JobCard.module.css";

export function JobCard({ job }) {
  const { titulo, empresa, ubicacion, descripcion } = job;

  return (
    <article className={styles.jobCard}>
      <div className={styles.jobTitle}>
        <Link to={`/jobs/${job.id}`}>
          <h3>{titulo}</h3>
        </Link>
        <small>
          {empresa} | {ubicacion}
        </small>
      </div>

      <p className={styles.description}>{descripcion}</p>

      <div className={styles.actions}>
        <Link to={`/jobs/${job.id}`} className="button">
          Ver detalles
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="button button-apply"
        >
          Aplicar
        </button>
      </div>
    </article>
  );
}
