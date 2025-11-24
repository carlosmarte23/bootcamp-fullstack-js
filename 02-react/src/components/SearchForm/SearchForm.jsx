import styles from "./SearchForm.module.css";

import { useId } from "react";

export function SearchForm({ onSearch }) {
  const searchId = useId();
  const technologyId = useId();
  const locationId = useId();
  const contractId = useId();
  const experienceId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const filters = {
      technology: formData.get(technologyId),
      location: formData.get(locationId),
      contract: formData.get(contractId),
      experience: formData.get(experienceId),
    };

    onSearch(filters);
  };

  return (
    <section className={styles.searchForm}>
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form action="submit" role="search" onSubmit={handleSubmit}>
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
            name={searchId}
            id={searchId}
            placeholder="Buscar trabajos, empresas o habilidades"
          />
          <button type="submit" className={`button ${styles.searchButton}`}>
            Buscar
          </button>
        </div>
        <div className={styles.searchFilters}>
          <select name={technologyId} id={technologyId}>
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select name={locationId} id={locationId}>
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

          <select name={contractId} id={contractId}>
            <option value="">Tipo de contrato</option>
            <option value="full-time">Tiempo completo</option>
            <option value="part-time">Medio tiempo</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Pasantía</option>
          </select>

          <select name={experienceId} id={experienceId}>
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
