import React from "react";
import CountryCard from "../components/CountryCard";
import styles from "../styles/selectcountry.module.css"
import usa from "../assets/usa-scene.jpeg"
import china from "../assets/china-scene.jpg"
import switzerland from "../assets/switzerland-scene.jpg"
import france from "../assets/france-scene.JPG"
import japan from "../assets/japan-scene.jpeg"
import australia from "../assets/Australia.jpeg"
import italy from "../assets/italy-scene.jpg"
import india from "../assets/india-scene.jpg"
import egypt from "../assets/egypt-scene.jpg"
import taiwan from "../assets/taiwan-scene.jpg"
import malaysia from "../assets/malaysia-scene.jpg"
import vietnam from "../assets/vietname-scene.jpg"
const countries = [
  {
    src: usa ,
    country: "USA",
    title: "New York City",
    description:
      "New York is a diverse and bustling metropolis known for its iconic landmarks, world-renowned museums, vibrant culture, and thriving business scene.",
  },
  {
    src: china,
    country: "China",
    title: "Great Wall Of China",
    description:
      "A series of fortifications built along the northern borders of China to protect against invasions from various nomadic groups.",
  },
  {
    src: switzerland,
    country: "Switzerland",
    title: "The Matterhorn",
    description:
      "This pyramid-shaped giant is one of the world’s most photographed mountains.",
  },
  {
    src: france,
    country: "France",
    title: "Eiffel Tower",
    description:
      "An iconic Parisian landmark, towering over the city as a wrought-iron lattice structure that has become a symbol of French culture and engineering prowess.",
  },
  {
    src: japan,
    country: "Japan",
    title: "Mount Yoshino, Nara",
    description:
      "Thanks to its range in elevation, Mount Yoshino’s 30,000 cherry trees bloom at different times, making it a popular place to see a range of colors",
  },
  {
    src: australia,
    country: "Australia",
    title: "Opera House, Sydney",
    description:
      "A multi-venue performing arts centre in Sydney, widely regarded as one of the world's most famous and distinctive buildings and a masterpiece of 20th-century architecture",
  },
  {
    src: italy,
    country: "Italy",
    title: "Leaning Tower of Pisa",
    description:
      "The tower began to lean during construction in the 12th century, due to soft ground which could not properly support the structure's weight.",
  },
  {
    src: india,
    country: "India",
    title: "Taj Mahal",
    description:
      "An ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra.",
  },
  {
    src: egypt,
    country: "Egypt",
    title: "Egyptian Pyramids",
    description:
      "Masonry structures located in Egypt. Approximately 80 pyramids were built within the Kingdom of Kush.",
  },
  {
    src: taiwan,
    country: "Taiwan",
    title: "Street Food",
    description:
      "Taiwan is home to spectacular hiking trails, a vibrant metropolitan skyline, some of the world’s friendliest people, and of course, a fabulous food haven!",
  },
  {
    src: malaysia,
    country: "Malaysia",
    title: "Petronas Twin Tower",
    description:
      "The twin towers were built on the site of Kuala Lumpur's race track. It was the tallest structure in Malaysia.",
  },
  {
    src: vietnam,
    country: "Vietnam",
    title: "Ho Chi Minh",
    description:
      "Vibrating with energy, innovation, and traffic – lots of traffic – Ho Chi Minh City, formerly known as Saigon, is the economic heart of Vietnam.",
  },
];

const SelectCountry = () => {
    return (
      <div className={styles.body}>
        <h1>Select your favourite country</h1>
        <form >
          <div className={styles.pageContent}>
            {countries.map((country) => (
              <CountryCard
                key={country.country}
                country={country.country}
                img={country.src}
                title={country.title}
                description={country.description}
              />
            ))}
          </div>
  
          <div className={styles.wrapper}>
            <a href="index.html" className={styles.coolBtn}>
              <div className={styles.dotsContainer}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
              <span>Go!</span>
            </a>
          </div>
        </form>
      </div>
    );
  };

export default SelectCountry;
