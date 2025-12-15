import { JobListings } from "../components/JobListings/index.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchForm } from "../components/SearchForm/SearchForm.jsx";

import jobsData from "../data/jobs.json";

import { useState } from "react";

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

  const filteredJobs = jobsData.filter((job) => {
    return (
      (filters.technology === "" ||
        job.data.technology === filters.technology) &&
      (filters.type === "" || job.data.modalidad === filters.type) &&
      (filters.level === "" || job.data.nivel === filters.level) &&
      job.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const MAX_JOBS_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredJobs.length / MAX_JOBS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * MAX_JOBS_PER_PAGE,
    currentPage * MAX_JOBS_PER_PAGE
  );
  return {
    handleSearch,
    handleTextSearch,
    filteredJobs,
    paginatedJobs,
    totalPages,
    currentPage,
  };
};

export function Search() {
  const {
    handleSearch,
    handleTextSearch,
    filteredJobs,
    paginatedJobs,
    totalPages,
    currentPage,
  } = useFilters();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <SearchForm onSearch={handleSearch} onTextSearch={handleTextSearch} />

      <JobListings jobs={paginatedJobs} totalJobs={filteredJobs.length} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
