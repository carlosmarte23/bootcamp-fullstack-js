import { useAuthStore } from "../store/authStore.js";
import { useFavoritesStore } from "../store/favoritesStore.js";

import styles from "./Header.module.css";
import { Link } from "./Link.jsx";

export function Header() {
  const { favoritesCount } = useFavoritesStore();
  const { isLoggedIn } = useAuthStore();

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
        {isLoggedIn ? (
          <Link href="/profile" className={styles.favoriteLink}>
            <span className={styles.favoriteLabel}>Profile</span>
            <span className={styles.favoriteBadge}>
              <svg
                className={styles.heartIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
              </svg>
              <span className={styles.favoriteCount}>{favoritesCount()}</span>
            </span>
          </Link>
        ) : (
          ""
        )}
      </nav>

      <div className={styles.actions}>
        <LoginButton />
      </div>
    </header>
  );
}

function LoginButton() {
  const { isLoggedIn, login, logout } = useAuthStore();

  return isLoggedIn ? (
    <button onClick={logout} className="button">
      Cerrar sesión
    </button>
  ) : (
    <button onClick={login} className="button button-apply">
      Iniciar sesión
    </button>
  );
}
