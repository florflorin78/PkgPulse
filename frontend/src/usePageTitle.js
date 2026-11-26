import { useEffect } from "react";

// sets the text of the browser tab
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} · PkgPulse`;
  }, [title]);
}
