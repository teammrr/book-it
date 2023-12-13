import { useState, useEffect } from "react";

export default function DescriptionBox({ setUserDescription }: any) {
  const [description, setDescription] = useState<string>();
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    setUserDescription(description);
  }, [description, setUserDescription]);

  return (
    <>
      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          aria-required="true"
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
          placeholder="Please describe your reservation details..."
          value={description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
      </div>
    </>
  );
}
