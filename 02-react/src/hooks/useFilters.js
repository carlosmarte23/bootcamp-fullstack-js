import { useState } from "react";

export function useFilters() {
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
}
