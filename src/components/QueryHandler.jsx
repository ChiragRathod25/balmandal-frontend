function QueryHandler({ queries, children }) {
    const hasError = queries.find((query) => query.error);
    const isLoading = queries.some((query) => query.loading);
  
    if (hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
          <p className="text-red-500 text-lg font-semibold">
            {hasError.error.message || hasError.error}
          </p>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-gray-500 text-lg font-semibold">Loading...</p>
        </div>
      );
    }
    return (
      <div className="w-full">
        {children}
      </div>
    );
  }
  
  export default QueryHandler;
  