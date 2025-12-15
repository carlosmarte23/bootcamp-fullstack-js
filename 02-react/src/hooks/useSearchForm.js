import { useState } from "react";

export function useSearchForm({
  onSearch,
  onTextSearch,
  technologyId,
  locationId,
  contractId,
  experienceId,
}) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const filters = {
      technology: formData.get(technologyId),
      location: formData.get(locationId),
      contract: formData.get(contractId),
      experience: formData.get(experienceId),
    };

    onSearch(filters);
  };

  const handleTextChange = (event) => {
    const nextValue = event.target.value;
    setSearchText(nextValue);
    onTextSearch(nextValue);
  };

  return { searchText, handleSubmit, handleTextChange };
}
