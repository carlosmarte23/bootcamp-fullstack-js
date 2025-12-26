import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { ErrorState } from "../components/ErrorState";
import { JobSection } from "../components/JobSection";
import { Link } from "../components/Link";
import { Spinner } from "../components/Spinner";

import { errorHelper } from "../utils/errorHelper";
import styles from "./JobDetail.module.css";

export function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const controller = new AbortController();
    async function fetchJob() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs/${jobId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          const err = new Error("Job not found");
          err.status = response.status;
          throw err;
        }

        const json = await response.json();
        setJob(json);
      } catch (error) {
        if (error.name === "AbortError") return;

        setJob(null);
        setError({
          message: error.message,
          status: error.status ?? null,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [jobId]);

  const handleErrorClick = () => {
    if (location.key !== "default") navigate(-1);
    else navigate("/search", { replace: true });
  };

  const pageTitle = loading
    ? "Cargando..."
    : job
    ? `DevJobs - ${job.titulo}`
    : error
    ? error.message
    : "DevJobs";

  return (
    <main className={styles.container}>
      <title>{pageTitle}</title>
      {loading ? (
        <Spinner text="Cargando información del empleo..." />
      ) : error ? (
        <ErrorState
          title="Ocurrió un error"
          message={errorHelper(error)}
          actionLabel={"Regresar"}
          onAction={handleErrorClick}
        />
      ) : (
        job && (
          <>
            <div className={styles.jobDetails}>
              <nav className={styles.jobBreadcrumb}>
                <Link to="/search">Empleos</Link>
                <span>/</span>
                <span className={styles.currentJob}>{job.titulo}</span>
              </nav>
              <header className={styles.jobHeader}>
                <div>
                  <h1>{job.titulo}</h1>
                  <p>
                    <span>{job.empresa}</span> - <span>{job.ubicacion}</span>
                  </p>
                </div>

                <button
                  type="button"
                  className={`button ${styles.applyBtn}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  Aplicar ahora
                </button>
              </header>

              <JobSection
                title="Descripción del puesto"
                content={job.content.description}
              />

              <JobSection
                title="Responsabilidades"
                content={job.content.responsibilities}
              />

              <JobSection
                title="Requisitos"
                content={job.content.requirements}
              />

              <JobSection
                title="Acerca de la empresa"
                content={job.content.about}
              />

              <footer className={styles.jobApplyFooter}>
                <button href="#" className={`button ${styles.applyBtn}`}>
                  Aplicar ahora
                </button>
              </footer>
            </div>
          </>
        )
      )}
    </main>
  );
}
