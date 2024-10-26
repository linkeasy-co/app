import { useState, useEffect } from "react";

function usePersistedTheme(key, initialState) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem(key);
    return storedTheme !== null ? storedTheme === 'true' : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, isDarkMode);
  }, [isDarkMode, key]);

  return [isDarkMode, setIsDarkMode];
}

export default usePersistedTheme;