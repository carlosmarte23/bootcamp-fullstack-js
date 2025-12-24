import { usePersistentFilters } from "./usePersistentFilters";

const hasActiveFilters = (filters, searchQuery) => {
  return (
    Object.values(filters).some(
      (filter) => filter !== "" && filter !== undefined
    ) || searchQuery !== ""
  );
};
export function useFilters() {
  const {
    filters,
    searchQuery,
    currentPage,
    updateFilters,
    updateSearchQuery,
    updatePage,
    resetFilters,
  } = usePersistentFilters();

  const isFiltered = hasActiveFilters(filters, searchQuery);

  const handleSearch = (newFilters) => {
    updateFilters({
      technology: newFilters.technology,
      type: newFilters.type,
      level: newFilters.level,
    });
    updatePage(1);
  };

  const handleTextSearch = (textQuery) => {
    updateSearchQuery(textQuery);
    updatePage(1);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const setCurrentPage = (newPage) => {
    updatePage(newPage);
  };

  return {
    filters,
    searchQuery,
    currentPage,
    isFiltered,
    handleSearch,
    handleTextSearch,
    handleResetFilters,
    setCurrentPage,
  };
}
