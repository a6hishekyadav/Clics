import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const { addPin } = PinData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const addPinHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);

    try {
      await addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
      navigate("/");  // Navigate to the desired route after successful submission
    } catch (err) {
      setError("Failed to add your clic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const replaceFileHandler = () => {
    setFile("");
    setFilePrev("");
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
      <div className="flex items-center justify-center w-full max-w-4xl border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
        <div className="flex flex-col items-center w-1/3 border-r border-gray-300 pr-4">
          {filePrev ? (
            <>
              <img src={filePrev} alt="Preview" className="mb-4 w-full h-auto rounded-md" />
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={replaceFileHandler}
              >
                Replace
              </button>
            </>
          ) : (
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={handleClick}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeFileHandler}
              />
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
                <FaPlus />
              </div>
              <p className="text-gray-500">Choose a file</p>
            </div>
          )}
          <p className="mt-4 text-sm text-gray-400">
            We recommend using high quality .jpg files but less than 10mb
          </p>
        </div>

        <div className="w-2/3 pl-4">
          <form
            className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-lg"
            onSubmit={addPinHandler}
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="common-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="pin"
                className="common-input"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add+"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
