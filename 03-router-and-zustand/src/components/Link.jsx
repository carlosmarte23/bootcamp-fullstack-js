import { useLocation } from "react-router";
import styles from "./Link.module.css";

import { Link as NavLink } from "react-router";
export function Link({ href, children, ...props }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavLink
      to={href}
      className={`${styles.link} ${currentPath === href ? styles.active : ""}`}
      {...props}
    >
      {children}
    </NavLink>
  );
}
