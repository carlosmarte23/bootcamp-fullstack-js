import { NavLink } from "react-router";
import styles from "./Link.module.css";

export function Link({
  href,
  children,
  className = "",
  variant = "nav", // "nav" | "button"
  ...props
}) {
  const isNav = variant === "nav";

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `${styles.base} ${isNav ? styles.nav : ""} ${
          isNav && isActive ? styles.active : ""
        } ${className}`.trim()
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
