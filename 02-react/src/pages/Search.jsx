import { JobListings } from "../components/JobListings/index.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchForm } from "../components/SearchForm/SearchForm.jsx";

import { useEffect, useState } from "react";

const MAX_JOBS_PER_PAGE = 4;

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: "",
    type: "",
    level: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (newFilters) => {
    setFilters({
      technology: newFilters.technology,
      type: newFilters.type,
      level: newFilters.level,
    });
    setCurrentPage(1);
  };

  const handleTextSearch = (textQuery) => {
    setSearchQuery(textQuery);
    setCurrentPage(1);
  };

  return {
    filters,
    searchQuery,
    handleSearch,
    handleTextSearch,
    currentPage,
    setCurrentPage,
  };
};

export function Search() {
  const {
    filters,
    searchQuery,
    handleSearch,
    handleTextSearch,
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
        const response = await fetch("https://jscamp-api.vercel.app/api/jobs");
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
  }, []);

  const totalPages = Math.ceil(total / MAX_JOBS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <SearchForm onSearch={handleSearch} onTextSearch={handleTextSearch} />

      {loading ? (
        <div style={{ textAlign: "center", marginBlock: "2rem" }}>
          Cargando empleos...
        </div>
      ) : (
        <div>
          <JobListings jobs={jobs} totalJobs={total} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
}
