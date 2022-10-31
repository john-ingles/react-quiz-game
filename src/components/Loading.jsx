import React from "react";

export default function Loading() {
  const [loading, setLoading] = React.useState("");
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading("Loading...");
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
  return <h1>{loading}</h1>;
}
