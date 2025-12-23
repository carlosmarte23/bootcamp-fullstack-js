import { useState } from "react";
import { usePersistenFilters } from "./usePersistentFilters";

const hasActiveFilters = (filters, searchQuery) => {
  return (
    Object.values(filters).some(
      (filter) => filter !== "" && filter !== undefined
    ) || searchQuery !== ""
  );
};
export function useFilters() {
  const { filters, setFilters, resetFilters } = usePersistenFilters();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const isFiltered = hasActiveFilters(filters, searchQuery);

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

  const handleResetFilters = () => {
    resetFilters();
    setSearchQuery("");
    setCurrentPage(1);
  };

  return {
    filters,
    searchQuery,
    isFiltered,
    handleSearch,
    handleTextSearch,
    handleResetFilters,
    currentPage,
    setCurrentPage,
  };
}
