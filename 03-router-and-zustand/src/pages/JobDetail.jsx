export function JobDetail() {
  return (
    <main class="job-details-page">
      <nav class="job-breadcrumb">
        <a href="jobs.html">Empleos</a>
        <span>/</span>
        <a href="#">Ingeniero de Software Senior</a>
      </nav>
      <div class="job-details">
        <header class="job-header">
          <div class="job-meta">
            <h1>Ingeniero de Software Senior</h1>
            <p>
              <span class="job-company">Tech Solutions Inc.</span> -
              <span class="job-location">Remoto</span>
            </p>
          </div>
          <a href="#" class="button btn-apply">
            Aplicar ahora
          </a>
        </header>

        <section class="job-section">
          <div class="job-description">
            <h2>Descripción del puesto</h2>
            <p>
              Tech Solutions Inc. está buscando un Ingeniero de Software Senior
              altamente motivado y experimentado para unirse a nuestro equipo
              remoto. El candidato ideal tendrá una sólida formación en
              desarrollo de software, con experiencia en el diseño, desarrollo e
              implementación de soluciones de software escalables y de alto
              rendimiento. Como Ingeniero de Software Senior, usted será
              responsable de liderar proyectos de desarrollo, mentorizar a
              ingenieros junior y colaborar con equipos multifuncionales para
              entregar productos de software de alta calidad.
            </p>
          </div>
        </section>

        <section class="job-section">
          <h2>Responsabilidades</h2>
          <ul>
            <li>
              Diseñar, desarrollar y mantener aplicaciones web utilizando
              tecnologías modernas.
            </li>
            <li>
              Colaborar con equipos de producto y diseño para definir y entregar
              nuevas características.
            </li>
            <li>Escribir código limpio, eficiente y bien documentado.</li>
            <li>
              Realizar revisiones de código y proporcionar retroalimentación
              constructiva a los miembros del equipo.
            </li>
          </ul>
        </section>

        <section class="job-section">
          <h2>Requisitos</h2>
          <ul>
            <li>Licenciatura en Informática o campo relacionado.</li>
            <li>Mínimo de 5 años de experiencia en desarrollo de software.</li>
            <li>
              Experiencia con frameworks de JavaScript (por ejemplo, React,
              Angular, Vue.js).
            </li>
            <li>
              Familiaridad con metodologías ágiles y herramientas de control de
              versiones (por ejemplo, Git).
            </li>
          </ul>
        </section>

        <section class="job-section">
          <h2>Acerca de la empresa</h2>
          <p>
            Tech Solutions Inc. es una empresa de tecnología innovadora que se
            centra en la creación de soluciones de software de vanguardia para
            diversas industrias. Estamos comprometidos con el fomento de un
            entorno de trabajo colaborativo e inclusivo donde cada empleado
            pueda prosperar y crecer profesionalmente. Ofrecemos salarios
            competitivos, beneficios integrales y oportunidades de desarrollo
            profesional continuo.
          </p>
        </section>
        <footer class="job-apply-footer">
          <a href="#" class="button btn-apply">
            Aplicar ahora
          </a>
        </footer>
      </div>
    </main>
  );
}
