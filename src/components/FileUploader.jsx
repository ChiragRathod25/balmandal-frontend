import { useState, useEffect } from "react";
import { Input } from "./";

function MultipleFilesInputPreview({ register, name, accept, watch }) {
  const [preview, setPreview] = useState([]);
  const files = watch(name);

  useEffect(() => {
    if (files && files.length > 0) {
      const newPreview = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      }));
      setPreview(newPreview);
      return () => newPreview.forEach(({url}) => URL.revokeObjectURL(url));
    }
  }, [files]);

  return (
    <div className="p-4">
      <Input
        type="file"
        label="Images and Videos"
        accept={accept}
        {...register(name)}
        multiple
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

      {preview.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Selected Files:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {preview && preview.length>0 &&  preview.map(({ url, type }, index) => (
              <li key={index} className="relative">

                {type === "image" ? (
                  <img src={url} className="w-full h-auto rounded-lg shadow-md" alt={`Preview ${index}`} />
                ) : (
                  <video controls className="w-full h-auto rounded-lg shadow-md">
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MultipleFilesInputPreview;
