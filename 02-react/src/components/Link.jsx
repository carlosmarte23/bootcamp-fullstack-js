import styles from "./Link.module.css";

export function Link({ href, children, ...props }) {
  const handleClick = (event) => {
    event.preventDefault();

    //remove focus so style doesn't get stuck
    event.currentTarget.blur();

    //change URL
    window.history.pushState({}, "", href);

    //trigger navigation event
    const navigationEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navigationEvent);
  };

  return (
    <a href={href} onClick={handleClick} className={styles.link} {...props}>
      {children}
    </a>
  );
}
