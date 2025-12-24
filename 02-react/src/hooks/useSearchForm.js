import { useEffect, useState } from "react";
let timeout = null;

export function useSearchForm({ onSearch, onTextSearch, initialText = "" }) {
  const [searchText, setSearchText] = useState(initialText);

  useEffect(() => {
    setSearchText(initialText);
  }, [initialText]);

  const handleFilterChange = (event) => {
    if (event.target.name === "text") return;

    // event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);

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

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      onTextSearch(nextValue);
    }, 300);
  };

  return { searchText, handleFilterChange, handleTextChange };
}
