import { useState } from "react";

export function useSearchForm({ onSearch, onTextSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (event) => {
    if (event.target.name === "text") return;

    const formData = new FormData(event.currentTarget);

    const filters = {
      technology: formData.get("technology"),
      type: formData.get("type"),
      level: formData.get("level"),
    };

    onSearch(filters);
  };

  const handleTextChange = (event) => {
    const nextValue = event.target.value;
    setSearchText(nextValue);
    onTextSearch(nextValue);
  };

  return { searchText, handleFilterChange, handleTextChange };
}
