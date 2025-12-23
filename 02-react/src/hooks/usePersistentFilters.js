import { useEffect, useState } from "react";

const INITIAL_FILTERS = {
  technology: "",
  type: "",
  level: "",
};

const INITIAL_STATE = {
  filters: INITIAL_FILTERS,
  text: "",
  page: 1,
};

export function usePersistentFilters() {
  const [searchState, setSearchState] = useState(() => {
    const savedJobState = localStorage.getItem("jobSearchState");

    if (!savedJobState) return INITIAL_STATE;

    try {
      return JSON.parse(savedJobState);
    } catch (error) {
      console.error(
        `Failed to parse local storage job filters: ${error.message}`
      );
    }
  });

  useEffect(() => {
    //see if the filters are empty or searchQuery is empty
    const isEmpty =
      Object.values(searchState.filters).every((f) => f === "") &&
      searchState.text.trim() === "" &&
      searchState.page === 1;

    if (isEmpty) {
      localStorage.removeItem("jobSearchState");
      return;
    }

    //If there is a filter, save it to the local storage
    const stateString = JSON.stringify(searchState);
    localStorage.setItem("jobSearchState", stateString);
  }, [searchState]);

  const updateFilters = (newFilters) => {
    setSearchState((prev) => ({
      ...prev,
      filters: newFilters,
    }));
  };

  const updateSearchQuery = (newQuery) => {
    setSearchState((prev) => ({
      ...prev,
      text: newQuery,
    }));
  };

  const updatePage = (newPage) => {
    setSearchState((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const resetFilters = () => {
    setSearchState(INITIAL_STATE);
  };

  return {
    filters: searchState.filters,
    searchQuery: searchState.text,
    currentPage: searchState.page,
    updateFilters,
    updateSearchQuery,
    updatePage,
    resetFilters,
  };
}
