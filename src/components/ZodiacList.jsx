import React, { useState, useEffect } from "react";
import axios from "axios";
import { zodiacTranslations } from "../translations";
import { zodiacPeriods } from "../zodiacPeriods";

const ZodiacList = ({ language, onZodiacClick }) => {
  const [horoscopes, setHoroscopes] = useState([]);

  const translations = zodiacTranslations[language];
  const periods = zodiacPeriods[language];

  useEffect(() => {
    axios
      .post("https://poker247tech.ru/get_horoscope/", {
        language: language,
        period: "today",
      })
      .then((res) => {
        setHoroscopes(res.data.horoscope);
      })
      .catch((error) => console.error("Error fetching zodiac signs:", error));
  }, [language]);

  return (
    <div className="horoscope-list">
      {Object.keys(horoscopes).map((sign) => (
        <div
          key={sign}
          className="horoscope-item"
          onClick={() => onZodiacClick(sign)}
        >
          <img src={`./${sign}.png`} alt={sign} />
          <div className="horoscope-info">
            <h3>{translations[sign]}</h3>
            <p>{periods[sign]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ZodiacList;
