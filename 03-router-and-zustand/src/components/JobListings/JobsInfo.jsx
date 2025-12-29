import styles from "./JobsInfo.module.css";

export function JobsInfo({ jobsCount }) {
  return (
    <div className={styles.jobsInfo}>
      ¡Se encontraron <strong>{jobsCount}</strong> oportunidades!.
    </div>
  );
}
