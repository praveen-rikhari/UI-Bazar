"use client"
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = () => {
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [activeEditor, setActiveEditor] = useState('html');

    const handleHtmlChange = (value) => {
        setHtmlCode(value);
    };

    const handleCssChange = (value) => {
        setCssCode(value);
    };
    const active = {
        padding: '0.5rem 1rem',
        border: '1px solid #0070f3',
        borderRadius: '3px',
        cursor: 'pointer',
        background: '#0070f3',
        color: '#fff',
        margin: '0 0.5rem',
        transition: 'background 0.3s, color 0.3s', // Add transition for smoother interaction
    };

    const inactive = {
        ...active,
        background: '#fff',
        color: '#0070f3',
    };


    return (
        <div className="container">
            <div className="editorSection">
                <div className="buttons">
                    <button
                        onClick={() => setActiveEditor('html')}
                        style={activeEditor === 'html' ? active : inactive}
                    >
                        HTML
                    </button>
                    <button
                        onClick={() => setActiveEditor('css')}
                        style={activeEditor === 'css' ? active : inactive}
                    >
                        CSS
                    </button>
                </div>
                {activeEditor === 'html' ? (
                    <Editor
                        height="500px"
                        language="html"
                        value={htmlCode}
                        onChange={handleHtmlChange}
                        theme="vs-dark"
                    />
                ) : (
                    <Editor
                        height="500px"
                        language="css"
                        value={cssCode}
                        onChange={handleCssChange}
                        theme="vs-dark"
                    />
                )}
            </div>
            <div className="previewSection">
                <h3>Result</h3>
                <iframe
                    className="result"
                    srcDoc={`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <style>
                                ${cssCode}
                            </style>
                        </head>
                        <body>
                            ${htmlCode}
                        </body>
                    </html>`}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
