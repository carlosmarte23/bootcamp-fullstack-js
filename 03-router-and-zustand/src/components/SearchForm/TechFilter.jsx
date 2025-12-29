import styles from "./TechFilter.module.css";

export function TechFilter() {
  return (
    <>
      {/* <!-- Tech Filter pseudo select --> */}
      <div className={styles.filterTech}>
        <button
          type="button"
          className={styles.filterToggle}
          id="filter-tech-toggle"
        >
          TecnologÃ­a <span aria-hidden="true"></span>
        </button>

        <div className={styles.filterDropdown} id="filter-tech-dropdown">
          <p className={styles.filterDropdownTitle}>Tecnologias populares</p>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="javascript" />
            JavaScript
          </label>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="python" />
            Python
          </label>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="react" />
            React
          </label>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="node" />
            Node.js
          </label>
          <hr />
          <p className={styles.filterDropdownTitle}>Otras tecnologÃ­as</p>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="java" />
            Java
          </label>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="csharp" />
            C#
          </label>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="c" />C
          </label>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="c++" />
            C++
          </label>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="ruby" />
            Ruby
          </label>
          <label className={styles.filterCheckbox}>
            <input type="checkbox" name="filter-tech" value="php" />
            PHP
          </label>
        </div>
      </div>
    </>
  );
}




