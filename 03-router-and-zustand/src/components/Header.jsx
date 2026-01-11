import styles from "./Header.module.css";
import { Link } from "./Link.jsx";

export function Header({ isLoggedIn, onLogin, onLogout }) {
  return (
    <header>
      <h1 className={styles.logo}>
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

      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/search">Empleos</Link>
        <Link href="/contact">Contacto</Link>
      </nav>

      <div className={styles.actions}>
        <Link href="#" variant="button" className="button">
          Publicar un empleo
        </Link>
        {isLoggedIn ? (
          <button onClick={onLogout} className="button">
            Cerrar sesión
          </button>
        ) : (
          <button onClick={onLogin} className="button button-apply">
            Iniciar sesión
          </button>
        )}
      </div>
    </header>
  );
}
