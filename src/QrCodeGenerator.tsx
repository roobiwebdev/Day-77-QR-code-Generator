import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QrCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGenerate = () => {
    try {
      const validatedUrl = new URL(url).toString(); // Validate and convert URL to string
      localStorage.setItem("url", validatedUrl); // Save the validated URL to localStorage
      navigate("/qrcode");
    } catch (error) {
      console.error("Invalid URL");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full flex flex-col justify-center items-center z-10 text-white">
        <div className="mb-10 cursor-pointer">
          <img src="src/assets/Logo.svg" alt="Logo" />
        </div>
        <div className="w-full relative flex flex-col justify-center items-center md:w-[700px]">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a URL"
            className="w-11/12 text-xl p-3 sm:p-4 lg:py-5 lg:pl-5 text-white bg-[#030616] outline-none rounded-2xl border-2 border-[#263FA9]"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            className="absolute right-6 sm:right-10 sm:top-2 py-2.5 px-4 sm:py-3 sm:px-6 lg:py-4 lg:px-7 border font-semibold rounded-xl bg-[#263FA9] outline-none border-none"
          >
            Generate QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;