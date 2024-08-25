import React, { useState, useEffect } from "react";
import ZodiacList from "./components/ZodiacList";
import ZodiacDescription from "./components/ZodiacDescription";
import axios from "axios";

import "./App.scss";

const App = () => {
  const [language, setLanguage] = useState("original");
  const [selectedZodiac, setSelectedZodiac] = useState(null);

  useEffect(() => {
    const userLang = navigator.language || "en";
    setLanguage(userLang.startsWith("ru") ? "translated" : "original");
  }, []);

  const handleZodiacClick = (zodiac) => {
    axios
      .post("https://poker247tech.ru/get_horoscope/", {
        sign: zodiac,
        language,
        period: "today",
      })
      .then((response) => setSelectedZodiac(response.data))
      .catch((error) =>
        console.error("Error fetching zodiac description:", error),
      );
  };

  useEffect(() => {
    if (!selectedZodiac) return;
    axios
      .post("https://poker247tech.ru/get_horoscope/", {
        sign: selectedZodiac.sign,
        language,
        period: "today",
      })
      .then((response) => setSelectedZodiac(response.data))
      .catch((error) =>
        console.error("Error fetching zodiac description:", error),
      );
  }, [language]);

  const handleCloseDescription = () => {
    setSelectedZodiac(null);
  };

  return (
    <div className="app">
      <header>
        <button
          onClick={() =>
            setLanguage(language === "original" ? "translated" : "original")
          }
        >
          {language === "original"
            ? "Использовать английский"
            : "Switch to Russian"}
        </button>
      </header>
      {selectedZodiac ? (
        <ZodiacDescription
          zodiac={selectedZodiac}
          onClose={handleCloseDescription}
          language={language}
        />
      ) : (
        <ZodiacList language={language} onZodiacClick={handleZodiacClick} />
      )}
    </div>
  );
};

export default App;
