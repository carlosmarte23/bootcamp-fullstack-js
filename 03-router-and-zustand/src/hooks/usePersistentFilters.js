import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

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

const initializeFromURL = (params) => {
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

const buildParamsFromState = (state) => {
  const params = new URLSearchParams();
  if (state.text.trim()) params.set("text", state.text.trim());
  if (state.page !== 1) params.set("page", String(state.page));

  if (state.filters.technology)
    params.set("technology", state.filters.technology);
  if (state.filters.type) params.set("type", state.filters.type);
  if (state.filters.level) params.set("level", state.filters.level);

  return params;
};

export function usePersistentFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchState, setSearchState] = useState(() => {
    const { hasAny, urlState } = initializeFromURL(searchParams);

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

  //If there is a filter, save it to the local storage
  useEffect(() => {
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

  // State -> URL (User change filters/text/page)
  useEffect(() => {
    const nextParams = buildParamsFromState(searchState);

    if (nextParams.toString() === searchParams.toString()) return;

    setSearchParams(nextParams, { replace: true });
  }, [searchState, searchParams, setSearchParams]);

  // URL -> State (URL changes because of back/forward or shared link)
  useEffect(() => {
    const { hasAny, urlState } = initializeFromURL(searchParams);
    if (!hasAny) return;

    setSearchState((prev) => {
      const current = JSON.stringify(prev);
      const next = JSON.stringify(urlState);
      if (current === next) prev;
      return urlState;
    });
  }, [searchParams]);

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
    setSearchParams({}, { replace: true });
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
