import React, { useState, useEffect } from "react";
import "../Search/style.css";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Handle text-based search
  const handleSearch = () => {
    if (onSearch && query.trim() !== "") {
      onSearch(query);
    }
  };

  // Voice search function
  const startListening = () => {
    if (!window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript); // Update state with recognized text

      // Ensure state updates before triggering search
      setTimeout(() => handleSearch(), 100);
    };

    recognition.start();
  };

  // Debugging: Check if query updates correctly
  useEffect(() => {
    console.log("Query updated:", query);
  }, [query]);

  return (
    <div className="searchBox w-full h-[50px] rounded-[15px] border border-black shadow-sm relative p-2 flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-[30px] outline-none bg-transparent p-2 pr-12 text-black font-medium 
                   placeholder:text-[10px] sm:placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg 
                   sm:placeholder-shown:truncate"
        placeholder="Search for Products, Brands and More"
      />
      <button
        onClick={handleSearch}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
      >
        <IoIosSearch className="w-5 h-5" />
      </button>
      <button
        onClick={startListening}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 
                   ${isListening ? "text-red-500" : ""}`}
      >
        <FaMicrophone className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Search;
