"use client";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import "./SnipPage.css";
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Comment from "@/components/Comment";
import './Comments.css';
import formatDateTime from "@/formatDateTime";

const SnipPage = ({ params }) => {
    const [posts, setPosts] = useState({});
    const [activeTab, setActiveTab] = useState("html");
    const { userId, sessionId, getToken } = useAuth();
    const [copied, setCopied] = useState(false); // Add this line
    const [allComments, setAllComments] = useState([]);

    // user details hook from clerk
    const { isLoaded, isSignedIn, user } = useUser();
    const addComment = (newComment) => {
        setAllComments((prevComments) => [...prevComments, newComment]);
    };
    const deleteComment = (commentId) => {
        setAllComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
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
                }
            } catch (error) {
                console.error("Error while fetching single post : ", error);
            }
        };
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comment/${posts._id}`);
                setAllComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchPosts();
        fetchComments();
    }, [params.id, posts._id]);

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
                            {posts.userId === userId && <Link href="/browse">
                                <button onClick={() => handlePostDelete(params.id)}>Delete</button></Link>
                            }
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

                                {
                                    copied &&
                                    <div className="copy-notification">
                                        Copied!
                                    </div>
                                } {" "}

                                <pre style={{
                                    overflow: 'auto',
                                    maxHeight: '300px',
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word'
                                }}>

                                    <SyntaxHighlighter
                                        language={activeTab === "html" ? "html" : "css"}
                                        style={atomOneDark}
                                        showLineNumbers
                                    >
                                        {activeTab === "html" ? posts.htmlCode : posts.cssCode}
                                    </SyntaxHighlighter>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment-card">
                <Comment postId={posts._id} addComment={addComment} deleteComment={deleteComment} />

                {
                    Array.isArray(allComments) && allComments.length > 0 ?
                        allComments.map((comment, i) => {
                            return (
                                <div className="comments" key={i}>
                                    <div className="comment-container">
                                        <div className="user-details">
                                            <div className="box-1">
                                                <div className="user-pic">
                                                    <img src={comment.imgUrl} alt="User Image" />
                                                </div>
                                                <div className="user-info">
                                                    <span className="username">{comment.fullName}</span>
                                                    <p className="post-date">
                                                        {formatDateTime(comment.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="box-2"></div>
                                            {
                                                comment.userId === userId &&
                                                <button
                                                    className="com-del-btn"
                                                    onClick={() => deleteComment(comment._id)}>
                                                    Delete
                                                </button>
                                            }
                                        </div>
                                        <p className="comment-content">
                                            {comment.comment}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h2>
                            Be the first to leave a comment!
                        </h2>
                }

            </div>
        </div>
    );
};

export default SnipPage;
