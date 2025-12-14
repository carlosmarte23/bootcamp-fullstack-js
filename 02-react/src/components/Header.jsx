import styles from "./Header.module.css";
import { Link } from "./Link.jsx";

export function Header() {
  return (
    <header>
      <Link href="/">
        <h1>
          <svg
            fill="none"
            stroke="currentColor"
            width="32"
            height="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
      </Link>

      <nav>
        <Link href="/search">Empleos</Link>
        <Link href="/contact">Contacto</Link>
      </nav>

      <div className={styles.actions}>
        <Link href="#" className="button">
          Publicar un empleo
        </Link>
        <Link href="#" className="button">
          Iniciar sesión
        </Link>
      </div>
    </header>
  );
}
