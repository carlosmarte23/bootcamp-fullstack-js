import { useEffect, useState } from "react";

const INITIAL_FILTERS = {
  technology: "",
  type: "",
  level: "",
};

export function usePersistenFilters() {
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

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return {
    filters,
    setFilters,
    resetFilters,
  };
}
