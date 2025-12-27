import styles from "./Spinner.module.css";

export function Spinner({ text = "Buscando empleos..." }) {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerAnimation}></div>
      <p>{text}</p>
    </div>
  );
}
