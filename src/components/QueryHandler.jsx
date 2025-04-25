function QueryHandler({ queries, children }) {
  const hasError = queries.find((query) => query.error);
  const isLoading = queries.some((query) => query.loading);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-8 px-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <svg
          className="w-10 h-10 text-[#C30E59] mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <p className="text-[#C30E59] text-lg font-semibold text-center">
          Oops! Something went wrong.
        </p>

        <p className="text-sm text-gray-600 mt-1 text-center max-w-sm">
          {hasError?.error?.message ||
            hasError?.error ||
            'An unexpected error occurred. Please try again later.'}
        </p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-8">
        <div className="loader mb-3" />
        <div className="text-[#C30E59] text-lg font-semibold tracking-wide animate-pulse">
          Just a moment...
        </div>
      </div>
    );
  }
  return <div className="w-full">{children}</div>;
}

export default QueryHandler;
