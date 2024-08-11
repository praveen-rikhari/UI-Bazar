"use client"
import { useState } from 'react';
import Image from 'next/image';
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import './Faq.css';

function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Do we need to create an account for accessing snippets?",
            answer: "No Ui-bazar do not offers such case to there users. However if you need to create your own snippet then you will need to create an account."
        },
        {
            question: "What kind of snippets do you have?",
            answer: "The UI-bazar library offers a collection of over 250 free, open-source HTML and CSS snippets, including buttons, checkboxes, loaders, toggle switches, and input fields. These snippets provide valuable tools to enhance and elevate the quality of your project."
        },
        {
            question: "How we can create a snippet?",
            answer: "To create a snippet you need to SignUp and then go to create page and you will find a code editor with live result display. So create post and share"
        },
        {
            question: "How to report a query?",
            answer: "To report a query you can raise an issue on the github page of Ui-Bazar or you can write a mail down to creators"
        }
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-all">
            <div className="faq-container">
                <div className="header-section">
                    <h1>FAQ's</h1>
                    <div className="image-container">
                        <Image
                            src="/faq.svg"
                            alt="FAQ Image"
                            width={300}
                            height={300}
                            className="image"
                        />
                    </div>
                    <div className="intro-text">
                        Have Questions? Find your answers here.
                    </div>
                </div>
                <div className="faq-section">
                    {
                        faqs.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <div
                                    className="faq-question"
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <span>
                                        {
                                            faq.question
                                        }
                                    </span>
                                    <span className="icon">
                                        {
                                            activeIndex === index ? <RiSubtractFill /> : <IoMdAdd />
                                        }
                                    </span>
                                </div>
                                {
                                    activeIndex === index && (
                                        <div className="faq-answer">
                                            {faq.answer}
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Faq;
