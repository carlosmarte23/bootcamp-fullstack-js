import { useEffect, useState } from "react";

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
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("jobFilters");

    if (!savedFilters) return INITIAL_FILTERS;

    try {
      return JSON.parse(savedFilters);
    } catch (error) {
      console.error(
        `Failed to parse local storage job filters: ${error.message}`
      );
    }
  });

  useEffect(() => {
    //see if the filters are empty
    const isEmpty = Object.values(filters).every((f) => f === "");

    if (isEmpty) {
      localStorage.removeItem("jobFilters");
      return;
    }

    //If there is a filter, save it to the local storage
    const filterString = JSON.stringify(filters);
    localStorage.setItem("jobFilters", filterString);
  }, [filters]);

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
    setFilters(INITIAL_FILTERS);
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
