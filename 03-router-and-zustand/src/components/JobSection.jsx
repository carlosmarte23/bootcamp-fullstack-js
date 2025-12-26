import snarkdown from "snarkdown";

import styles from "./JobSection.module.css";

export function JobSection({ title, content }) {
  const html = snarkdown(content ?? "");

  return (
    <section className={styles.jobSection}>
      <h2>{title}</h2>
      <div className={`${styles.sectionContent} ${styles.prose}`}>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </section>
  );
}
