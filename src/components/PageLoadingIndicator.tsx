import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const LOADING_DURATION_MS = 300;

const PageLoadingIndicator = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const isLoggedArea = location.pathname.startsWith("/dashboard");

    if (!isLoggedArea) {
      setIsLoading(false);
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATION_MS);

    return () => clearTimeout(timer);
  }, [location.pathname, location.key]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-current border-t-transparent"
          style={{ color: "#FFC107" }}
        />
        <span className="text-sm font-medium text-muted-foreground">Carregando...</span>
      </div>
    </div>
  );
};

export default PageLoadingIndicator;
