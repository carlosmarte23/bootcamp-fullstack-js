import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { ErrorState } from "../components/ErrorState";
import { Link } from "../components/Link";
import { Spinner } from "../components/Spinner";

import { errorHelper } from "../utils/errorHelper";
import styles from "./JobDetail.module.css";

import snarkdown from "snarkdown";

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

function DetailBreadcrumb({ job }) {
  return (
    <nav className={styles.jobBreadcrumb}>
      <Link to="/search">Empleos</Link>
      <span>/</span>
      <span className={styles.currentJob}>{job.titulo}</span>
    </nav>
  );
}

function DetailHeader({ job, onBack }) {
  return (
    <header className={styles.jobHeader}>
      <div>
        <h1>{job.titulo}</h1>
        <p>
          <span>{job.empresa}</span> - <span>{job.ubicacion}</span>
        </p>
      </div>

      <div className={styles.headerActions}>
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
        <button onClick={onBack} className={`button`}>
          Regresar
        </button>
      </div>
    </header>
  );
}

function DetailFooter() {
  return (
    <footer className={styles.jobApplyFooter}>
      <button href="#" className={`button ${styles.applyBtn}`}>
        Aplicar ahora
      </button>
    </footer>
  );
}

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
      setError(null);
      setJob(null);

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

  const handleBack = (e) => {
    e.preventDefault();

    navigate(-1);
  };

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

  if (loading) {
    return (
      <main className={styles.container}>
        <title>{pageTitle}</title>
        <Spinner text="Cargando información del empleo..." />
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className={styles.container}>
        <title>{pageTitle}</title>

        <ErrorState
          title="Ocurrió un error"
          message={errorHelper(error)}
          actionLabel={"Regresar"}
          onAction={handleErrorClick}
        />
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <title>{pageTitle}</title>
      <DetailBreadcrumb job={job} />
      <DetailHeader job={job} onBack={handleBack} />
      <JobSection
        title="Descripción del puesto"
        content={job.content.description}
      />
      <JobSection
        title="Responsabilidades"
        content={job.content.responsibilities}
      />
      <JobSection title="Requisitos" content={job.content.requirements} />
      <JobSection title="Acerca de la empresa" content={job.content.about} />
      <DetailFooter />
    </main>
  );
}
