import { useAuthStore } from "../../store/authStore";
import { useFavoritesStore } from "../../store/favoritesStore";
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
        <JobApplyButton />
        <JobFavoriteButton jobId={job.id} />
      </div>
    </article>
  );
}

function JobApplyButton() {
  const { isLoggedIn } = useAuthStore();
  return (
    <button
      type="button"
      disabled={!isLoggedIn}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="button button-apply"
    >
      Aplicar
    </button>
  );
}
function JobFavoriteButton({ jobId }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { isLoggedIn } = useAuthStore();
  return (
    <button
      type="button"
      disabled={!isLoggedIn}
      onClick={(e) => {
        toggleFavorite(jobId);
      }}
      className="button"
    >
      {isFavorite(jobId) ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#aa0303"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
      )}
    </button>
  );
}
