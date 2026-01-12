import { Link } from "../components/Link.jsx";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.glow} aria-hidden="true" />

      <section className={styles.card}>
        <p className={styles.kicker}>Error 404</p>
        <h1 className={styles.title}>
          <span className={styles.code}>404</span>
          Página no encontrada
        </h1>
        <p className={styles.description}>
          No pudimos encontrar la ruta que solicitaste.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={`button ${styles.primary}`}>
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
