import React from "react";
import { useSwipeable } from "react-swipeable";

import { zodiacTranslations } from "../translations";

const ZodiacDescription = ({ zodiac, onClose, language }) => {
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => onClose(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  const translations = zodiacTranslations[language];
  return (
    <div className="zodiac-description" {...swipeHandlers}>
      <button onClick={onClose}>
        {language === "original" ? "Назад" : "Back"}
      </button>
      <h2>{translations[zodiac.sign]}</h2>
      <p>{zodiac.horoscope}</p>
    </div>
  );
};

export default ZodiacDescription;
