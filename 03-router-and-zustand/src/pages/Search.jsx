import { ErrorState } from "../components/ErrorState.jsx";
import { JobListings } from "../components/JobListings/index.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchForm } from "../components/SearchForm/SearchForm.jsx";
import { Spinner } from "../components/Spinner.jsx";

import { useFilters } from "../hooks/useFilters";
import { useRouter } from "../hooks/useRouter";
import { errorHelper } from "../utils/errorHelper";

import { useEffect, useState } from "react";

const MAX_JOBS_PER_PAGE = 4;

export function Search() {
  const { navigateTo } = useRouter();

  const {
    filters,
    searchQuery,
    isFiltered,
    handleSearch,
    handleTextSearch,
    handleResetFilters,
    currentPage,
    setCurrentPage,
  } = useFilters();

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function fetchJobs() {
      setError(null);
      setLoading(true);

      const params = new URLSearchParams();
      if (filters.technology) params.append("technology", filters.technology);
      if (filters.type) params.append("type", filters.type);
      if (filters.level) params.append("level", filters.level);
      if (searchQuery) params.append("text", searchQuery);

      params.append("limit", MAX_JOBS_PER_PAGE);

      const offset = (currentPage - 1) * MAX_JOBS_PER_PAGE;
      params.append("offset", offset);

      const queryParams = params.toString();
      try {
        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`
        );

        if (!response.ok) {
          const err = new Error("Request failed");
          console.log(err);
          err.status = response.status;
          throw err;
        }

        const json = await response.json();
        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        setJobs([]);
        setTotal(0);
        setError({
          message: error.message,
          status: error.status ?? null,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [
    currentPage,
    filters.technology,
    filters.type,
    filters.level,
    searchQuery,
    retryCount,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("text", searchQuery);
    if (filters.technology) params.append("technology", filters.technology);
    if (filters.type) params.append("type", filters.type);
    if (filters.level) params.append("level", filters.level);
    if (currentPage > 1) params.append("page", currentPage);

    const queryParams = params.toString();
    const basePath = window.location.pathname;

    const newUrl = queryParams ? `${basePath}?${queryParams}` : basePath;
    navigateTo(newUrl);
  }, [filters, searchQuery, currentPage]);

  const totalPages = Math.ceil(total / MAX_JOBS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const searchPageTitle = loading
    ? `DevJobs - Buscando empleos...`
    : error
    ? `DevJobs - Error al cargar`
    : `DevJobs - Empleos: Mostrando ${total} Resultados. Pagina ${currentPage} de ${totalPages}`;

  return (
    <main>
      <title>{searchPageTitle}</title>
      <SearchForm
        filters={filters}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onTextSearch={handleTextSearch}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
      />

      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorState
          title="Ocurrió un error"
          message={errorHelper(error)}
          actionLabel={"Reintentar"}
          onAction={() => setRetryCount((prev) => prev + 1)}
        />
      ) : (
        <div>
          {jobs.length === 0 ? (
            <div
              style={{
                padding: "2rem",
                textWrap: "balance",
                textAlign: "center",
              }}
            >
              No se encontraron empleos que coincidan con los criterios de
              búsqueda.
            </div>
          ) : (
            <>
              <JobListings jobs={jobs} totalJobs={total} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      )}
    </main>
  );
}
