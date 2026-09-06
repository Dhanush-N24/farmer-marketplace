import { useEffect, useState } from "react";
import "./FarmBackground.css";

import farm1 from "../assets/farm1.jpg";
import farm2 from "../assets/farm2.jpg";
import farm3 from "../assets/farm3.jpg";
import farm4 from "../assets/farm4.jpg";
import farm5 from "../assets/farm5.jpg";

const images = [
  farm4,
  farm2,
  farm1,
  farm3,
  farm5,
];

export default function FarmBackground() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="farm-background">
      {images.map((image, index) => (
        <div
          key={index}
          className={`farm-bg-image ${
            index === activeImage ? "active" : ""
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}

      <div className="farm-bg-overlay" />

      <div className="farm-bg-glow glow-one" />
      <div className="farm-bg-glow glow-two" />

      <div className="floating-leaf leaf-one">🌿</div>
      <div className="floating-leaf leaf-two">🌱</div>
      <div className="floating-leaf leaf-three">🍃</div>
    </div>
  );
}