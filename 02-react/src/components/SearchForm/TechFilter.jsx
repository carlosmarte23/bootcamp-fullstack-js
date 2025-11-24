export function TechFilter() {
  return (
    <>
      {/* <!-- Tech Filter pseudo select --> */}
      <div className="filter filter-tech">
        <button type="button" className="filter-toggle" id="filter-tech-toggle">
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
    </>
  );
}
