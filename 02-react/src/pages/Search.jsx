import { JobListings } from "../components/JobListings/index.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchForm } from "../components/SearchForm/SearchForm.jsx";

import { useFilters } from "../hooks/useFilters";

import { useEffect, useState } from "react";

const MAX_JOBS_PER_PAGE = 4;

export function Search() {
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
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchJobs() {
      try {
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

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`
        );

        const json = await response.json();
        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
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
  ]);

  const totalPages = Math.ceil(total / MAX_JOBS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <SearchForm
        filters={filters}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onTextSearch={handleTextSearch}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
      />

      {loading ? (
        <div
          style={{ padding: "2rem", textWrap: "balance", textAlign: "center" }}
        >
          Cargando empleos...
        </div>
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
