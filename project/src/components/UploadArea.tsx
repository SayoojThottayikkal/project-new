import React from "react";

export default function UploadArea({ onFile }: { onFile: (f: File) => void }) {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) onFile(file);
  };

  return (
    <div className="p-4 rounded-md bg-white border border-gray-200">
      <div className="bg-sky-50 p-6 rounded">
        <div className="text-sm text-gray-500">Upload Project Logo</div>
        <div className="text-xs text-gray-400">Image should be below 4 mb</div>
        <div className="mt-4 flex gap-2">
          <label className="inline-block px-4 py-2 bg-sky-500 text-white rounded cursor-pointer">
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handle}
            />
          </label>
          <button type="button" className="px-3 py-2 border rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
