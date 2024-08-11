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
            question: "Question",
            answer: "Answer"
        },
        {
            question: "Question",
            answer: "Answer"
        },
        {
            question: "Question",
            answer: "Answer"
        },
        {
            question: "Question",
            answer: "Answer"
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
