export function Link({ href, children, ...props }) {
  const handleClick = (event) => {
    event.preventDefault();

    //change URL
    window.history.pushState({}, "", href);

    //trigger navigation event
    const navigationEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navigationEvent);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
