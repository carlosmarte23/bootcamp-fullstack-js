import { useRouter } from "../hooks/useRouter";
import styles from "./Link.module.css";
export function Link({ href, children, ...props }) {
  const { navigateTo } = useRouter();
  const handleClick = (event) => {
    event.preventDefault();

    //remove focus so style doesn't get stuck
    event.currentTarget.blur();

    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={styles.link} {...props}>
      {children}
    </a>
  );
}
