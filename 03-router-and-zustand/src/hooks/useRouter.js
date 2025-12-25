import { useNavigate } from "react-router";

export function useRouter() {
  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }

  return { navigateTo };
}
