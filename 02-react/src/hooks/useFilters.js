import { useState } from "react";

const INITIAL_FILTERS = {
  technology: "",
  type: "",
  level: "",
};
const hasActiveFilters = (filters, searchQuery) => {
  return (
    Object.values(filters).some(
      (filter) => filter !== "" && filter !== undefined
    ) || searchQuery !== ""
  );
};
export function useFilters() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const isFiltered = hasActiveFilters(filters, searchQuery);
  const isFiltered =
    filters.technology !== "" ||
    filters.type !== "" ||
    filters.level !== "" ||
    searchQuery.trim() !== "";

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
    isFiltered,
    handleSearch,
    handleTextSearch,
    currentPage,
    setCurrentPage,
  };
}
