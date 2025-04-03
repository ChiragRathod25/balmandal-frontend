import React from 'react';

function Error({ errorMsg }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-2xl font-semibold text-red-600">{errorMsg}</h1>
    </div>
  );
}

export default Error;
