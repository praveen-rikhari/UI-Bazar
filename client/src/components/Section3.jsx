import Image from "next/image";
import { FaHandPointRight } from "react-icons/fa";
import "./Section3.css";

export default function Section3() {
    return (
        <div className="s3-container">
            
            <section className="s3">
                <div className="imageContainer">
                    <Image
                        src="/hero.png"
                        alt="Hero Image"
                        width={600}
                        height={600}
                        className="image"
                    />
                </div>
                <div className="s3-content">
                    <h1>
                        Free open source collection of HTML & CSS snippets
                    </h1>
                    <p>
                        Available for you to explore, save, edit, create and use in your projects.
                    </p>
                    <div className="list-container">
                        {
                            [
                                "250+ snippets",
                                "Fully editable",
                                "Add to Favorites",
                                "Create your own with live Code Editor",
                                "Like & Comment features",
                                "No Ads"
                            ].map((text, index) => (
                                <div key={index} className="list">
                                    <FaHandPointRight /> {text}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}
