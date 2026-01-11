import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAuth } from "../context/authContext";

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
  const { isLoggedIn } = useAuth();
  return (
    <header className={styles.jobHeader}>
      <div className={styles.headerTitle}>
        <h1>{job.titulo}</h1>
        <p>
          <span>{job.empresa}</span> - <span>{job.ubicacion}</span>
        </p>
      </div>

      <div className={styles.headerActions}>
        <button
          disabled={!isLoggedIn}
          type="button"
          className="button button-apply"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {isLoggedIn ? "Aplicar ahora" : "Iniciar sesión para aplicar"}
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
      <button
        href="#"
        className={`button button-apply ${styles.footerApplyButton}`}
      >
        Aplicar ahora
      </button>
    </footer>
  );
}

export default function JobDetail({ isLoggedIn }) {
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

  const handleClick = (e, replaceHistory = true) => {
    e.preventDefault();
    if (location.key !== "default") navigate(-1);
    else navigate("/search", { replace: replaceHistory });
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
          onAction={handleClick}
        />
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <title>{pageTitle}</title>
      <DetailBreadcrumb job={job} />
      <DetailHeader
        job={job}
        onBack={(e) => handleClick(e, false)}
        isLoggedIn={isLoggedIn}
      />
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
