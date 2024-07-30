"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import "./SnipPage.css";

const SnipPage = ({ params }) => {
    const [posts, setPosts] = useState({});
    const [activeTab, setActiveTab] = useState("html");
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [copied, setCopied] = useState(false); // Add this line

    const handleDelete = async (postId) => {
        try {
            const { data } = await axios.delete(`/api/post/${postId}`);
            alert(data);
        } catch (error) {
            console.log("error in deleting", error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard: ', text);
        }).catch((err) => {
            console.error('Could not copy text: ', err);
        });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/api/post/${params.id}`);
                if (response) {
                    setPosts(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error("Error while fetching single post : ", error);
            }
        };
        fetchPosts();
    }, [params.id]);

    const createIframeContent = (htmlCode, cssCode) => {
        const iframeDocument = `
            <html>
            <head>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f4f4f4;
                    }
                    ${cssCode}
                </style>
            </head>
            <body>
                ${htmlCode}
            </body>
            </html>
        `;
        return iframeDocument;
    };

    return (
        <div className="singlePost-page">
            <div className="post-container">
                <div className="post-card">
                    <h3 className="post-header">
                        <span className="post-name">{posts.name}</span>
                        <div className="post-actions">
                            <button>Edit</button>
                            {posts.userId === userId && <button onClick={() => handleDelete(params.id)}>Delete</button>}
                        </div>
                    </h3>
                    <div className="content-wrapper">
                        <iframe
                            srcDoc={createIframeContent(posts.htmlCode, posts.cssCode)}
                            className="code-preview1"
                            title={`Post ${posts._id}`}
                            sandbox="allow-scripts allow-same-origin"
                        />

                        <div className="code-box">
                            <div className="tab-buttons">
                                <button
                                    className={`tab-button ${activeTab === "html" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveTab("html")}
                                >
                                    HTML
                                </button>
                                <button
                                    className={`tab-button ${activeTab === "css" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveTab("css")}
                                >
                                    CSS
                                </button>
                            </div>
                            <div className="code-content">
                                <button
                                    className="copy-button"
                                    onClick={() => {
                                        const codeToCopy =
                                            activeTab === "html" ? posts.htmlCode : posts.cssCode;
                                        copyToClipboard(codeToCopy); // Call the copyToClipboard function
                                        setCopied(true); // Set copied state to true when the button is clicked
                                        setTimeout(() => setCopied(false), 1000); // Hide after 1 seconds
                                    }}
                                >
                                    Copy {activeTab.toUpperCase()}
                                </button>
                                {copied && <div className="copy-notification">Copied!</div>}{" "}
                                {/* Notification message */}
                                <pre>
                                    <code>
                                        {activeTab === "html" ? posts.htmlCode : posts.cssCode}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SnipPage;
