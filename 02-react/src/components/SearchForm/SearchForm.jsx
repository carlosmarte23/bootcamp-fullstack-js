import styles from "./SearchForm.module.css";

export function SearchForm() {
  return (
    <section className={styles.searchForm}>
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form action="submit" role="search">
        <div className={styles.searchBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          <input
            type="text"
            name="search"
            id="jobs-search-input"
            required
            placeholder="Buscar trabajos, empresas o habilidades"
          />
        </div>
        <div className={styles.searchFilters}>
          {/* <!-- Tech Filter pseudo select --> */}
          <div className="filter filter-tech">
            <button
              type="button"
              className="filter-toggle"
              id="filter-tech-toggle"
            >
              Tecnología <span className="filter-toggle-icon"></span>
            </button>

            <div className="filter-dropdown" id="filter-tech-dropdown">
              <p className="filter-dropdown-title">Tecnologias populares</p>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="javascript" />
                JavaScript
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="python" />
                Python
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="react" />
                React
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="node" />
                Node.js
              </label>
              <hr />
              <p className="filter-dropdown-title">Otras tecnologías</p>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="java" />
                Java
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="csharp" />
                C#
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="c" />C
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="c++" />
                C++
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="ruby" />
                Ruby
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" name="filter-tech" value="php" />
                PHP
              </label>
            </div>
          </div>

          {/* <!-- Other select filters --> */}

          <select name="location" id="filter-location">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
            <option value="bsas">Buenos Aires</option>
            <option value="bogota">Bogotá</option>
            <option value="santiago">Santiago de Chile</option>
          </select>

          <select name="contract-type" id="filter-contract-type">
            <option value="">Tipo de contrato</option>
            <option value="full-time">Tiempo completo</option>
            <option value="part-time">Medio tiempo</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Pasantía</option>
          </select>

          <select name="experience-level" id="filter-experience">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
          <a href="#" id="clear-filters" className={`button isDisabled`}>
            Eliminar filtros
          </a>
        </div>
      </form>
    </section>
  );
}
