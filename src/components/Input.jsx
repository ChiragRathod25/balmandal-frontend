import React, { useId } from 'react';

function Input({ type = 'text', label, className = '', ...props }, ref) {
  const id = useId();
  return (
    <div className={`w-full max-w-md mx-auto ${type === 'checkbox' ? 'flex items-center w-full'  : ''}`}>
      {label && (
        <label className="block mb-2 w-full text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C30E59] focus:border-[#C30E59] ${className}`}
          id={id}
          ref={ref}
          rows={props.rows || 5} // Default rows to 5 if not provided
          {...props}
        />
      ) : type === 'checkbox' ? (
        <input
          type={type}
          className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C30E59] focus:border-[#C30E59] ${className}`}
          id={id}
          ref={ref}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C30E59] focus:border-[#C30E59] ${className}`}
          id={id}
          ref={ref}
          {...props}
        />
      )}
    </div>
  );
}

export default React.forwardRef(Input);
