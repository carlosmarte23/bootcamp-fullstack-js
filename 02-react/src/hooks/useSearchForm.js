export function useSearchForm({ onSearch, onTextSearch }) {
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
    onTextSearch(nextValue);
  };

  return { handleFilterChange, handleTextChange };
}
