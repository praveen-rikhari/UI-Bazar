import Image from "next/image";
import Link from "next/link";
import { FaCompass } from "react-icons/fa";
import "./hero.css"

export default function Home() {
  return (
    <div className="hero-container">
      <section className="hero">
        <div className="content">
          <h1>
            Free & Open-Source collection of UI Snippets.
          </h1>
          <p>
            UI-Bazar is an intuitive tool with a vast library of HTML and CSS snippets, plus a personal library to save your own.
          </p>
          <button className="browseButton">
            <FaCompass size={30} />
            <Link href={'/browse'} style={{ textDecoration: "none", color: "#fff" }}>
              Explore More Components
            </Link>
          </button>
        </div>
        <div className="imageContainer">
          <Image
            src="/hero.png"
            alt="Hero Image"
            width={600}
            height={600}
            className="image"
          />
        </div>
      </section>
    </div>
  );
}
