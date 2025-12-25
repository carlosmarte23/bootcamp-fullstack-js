import { useEffect, useRef, useState } from "react";

export function useSearchForm({ onSearch, onTextSearch, initialText = "" }) {
  const [searchText, setSearchText] = useState(initialText);
  let timeoutId = useRef(null);

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

    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      onTextSearch(nextValue);
    }, 400);
  };

  return { searchText, handleFilterChange, handleTextChange };
}
