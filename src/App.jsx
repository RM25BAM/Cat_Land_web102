import React, { useState, useEffect } from "react";
import "./App.css";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
function App() {
  const [catData, setCatData] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/breeds?api_key=live_wQmCscUhr1yHW0I9X1ovKXfXnEfKYDoKkm6GcvD1ar3TZJZZqXHg4wk1VPH8N8VH",
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );
      const data = await response.json();
      console.log(response);
      while (true) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const { reference_image_id, name, life_span, origin, weight } = data[randomIndex];

        const attributes = [name, life_span, origin, weight.imperial];
        if (attributes.some((attribute) => bannedAttributes.includes(attribute))) {
     
          continue;
        }

  
        const image = new Image();
        image.src = `https://cdn2.thecatapi.com/images/${reference_image_id}.jpg`;

        image.onload = () => {
          const catInfo = {
            reference_image_id,
            name,
            life_span,
            weight: weight.imperial,
            origin,
            randomName: randomCatName,
          };
          setCatData(catInfo);
        };

        image.onerror = () => {
     
          console.error("Error loading image. Finding another cat.");

        };

      
        break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBanAttribute = (attribute) => {
    if (!bannedAttributes.includes(attribute)) {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  };
  const handleRemoveBannedAttribute = (attribute) => {
    const updatedAttributes = bannedAttributes.filter((attr) => attr !== attribute);
    setBannedAttributes(updatedAttributes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const catNames = [
    "Buddy",
    "Max",
    "Bailey",
    "Charlie",
    "Lucy",
    "Cooper",
    "Lola",
    "Daisy",
    "Rocky",
    "Molly",
    "Stella",
    "Coco",
    "Ruby",
    "Bear",
    "Lily",
    "Zoe",
    "Milo",
    "Leo",
    "Oliver",
    "Luna",
  ];
  const randomCatName = catNames[Math.floor(Math.random() * catNames.length)];
  return (
    <>
      <div className="center-page">
        <h1>CAT LAND!</h1>
        <h3>Take a look at these beautiful cats!</h3>
        <h3>So cute!</h3>
        <br></br>
        <br></br>
        <div className="discover-container">
          {buttonClicked && catData !== null && (
            <div className="listening-container">
              <h2 className="cat-name">{catData.randomName}</h2>
              <div className="buttons">
                <button type="attribute" className="attribute-buttons" onClick={() => handleBanAttribute(catData.life_span)}>
                  {catData.life_span}
                </button>
                <button type="attribute" className="attribute-buttons" onClick={() => handleBanAttribute(catData.name)}>
                  {catData.name}
                </button>
                <button type="attribute" className="attribute-buttons" onClick={() => handleBanAttribute(catData.weight)}>
                  {catData.weight}
                </button>
                <button type="attribute" className="attribute-buttons" onClick={() => handleBanAttribute(catData.origin)}>
                  {catData.origin}
                </button>
                <br></br>
              </div>

              <img
                className="cat-pic"
                src={`https://cdn2.thecatapi.com/images/${catData.reference_image_id}.jpg`}
                alt="random image from Cat API"
                height="250px"
                width="250px"
              />
            </div>
          )}
          <br></br>
          <button
            type="discover"
            className="discover-btn"
            onClick={() => {
              fetchData();
              setButtonClicked(true);
            }}
          >
            🔀 Discover!
          </button>
        </div>
      </div>
      <div className="right-section">
        <h2>Banned Attributes</h2>
        <div className="banned-attributes-container">
          {bannedAttributes.map((attribute) => (
            <button key={attribute} className="banned-attribute-buttons" onClick={() => handleRemoveBannedAttribute(attribute)}>
              {attribute}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;