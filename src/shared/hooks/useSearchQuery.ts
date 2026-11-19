import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";

export function useSearchQuery(key = "search", delay = 300) {
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState(params.get(key) ?? "");
  const debounced = useDebounce(value, delay);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (debounced) next.set(key, debounced);
    else next.delete(key);
    setParams(next, { replace: true });
  }, [debounced]);

  return { value, setValue, params, setParams };
}
