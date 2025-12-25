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

const initializeFromURL = (search = window.location.search) => {
  const params = new URLSearchParams(search);

  const hasAny =
    params.has("text") ||
    params.has("technology") ||
    params.has("type") ||
    params.has("level") ||
    params.has("page");

  if (!hasAny) return { hasAny: false, urlState: null };

  const page = Number(params.get("page"));

  return {
    hasAny: true,
    urlState: {
      text: params.get("text") ?? "",
      page: page <= 0 ? 1 : page,
      filters: {
        technology: params.get("technology") ?? "",
        type: params.get("type") ?? "",
        level: params.get("level") ?? "",
      },
    },
  };
};

export function usePersistentFilters() {
  const [searchState, setSearchState] = useState(() => {
    const { hasAny, urlState } = initializeFromURL();

    if (hasAny) {
      return urlState;
    }

    try {
      const savedJobState = localStorage.getItem("jobSearchState");
      if (!savedJobState) return INITIAL_STATE;

      return JSON.parse(savedJobState) ?? INITIAL_STATE;
    } catch (error) {
      console.error(
        `Failed to parse local storage job filters: ${error.message}`
      );
      return INITIAL_STATE;
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
      page: 1,
    }));
  };

  const updateSearchQuery = (newQuery) => {
    setSearchState((prev) => ({
      ...prev,
      text: newQuery,
      page: 1,
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
    localStorage.removeItem("jobSearchState");
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
