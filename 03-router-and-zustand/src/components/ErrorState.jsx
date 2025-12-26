import styles from "./ErrorState.module.css";

export function ErrorState({ title, message, actionLabel, onAction }) {
  return (
    <div className={styles.container}>
      <svg
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className={styles.icon}
        viewBox="0 0 24 24"
      >
        <path fill="none" stroke="none" d="M0 0h24v24H0z" />
        <path d="M12 9v4m-1.637-9.409L2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0zM12 16h.01" />
      </svg>

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{message}</p>
      <button className="button" onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  );
}
