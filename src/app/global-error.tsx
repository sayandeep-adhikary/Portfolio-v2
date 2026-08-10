"use client";

// Root-level boundary: catches errors thrown by the root layout itself, where
// the (site) error boundary cannot reach. Must render its own <html>/<body>.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0c0e",
          color: "#f5f5f4",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <main
          style={{
            maxWidth: "28rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", color: "#8a8a94" }}>500</p>
          <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 600 }}>Something went wrong</h1>
          <p style={{ margin: 0, color: "#b5b5bd", lineHeight: 1.6 }}>
            An unexpected error occurred. Please try again.
          </p>
          {error.digest ? (
            <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", color: "#5a5a63" }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              alignSelf: "center",
              marginTop: "0.5rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#5b63d3",
              color: "#f5f5f4",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
