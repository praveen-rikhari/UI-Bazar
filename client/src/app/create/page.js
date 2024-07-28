"use client"
import React, { useState } from 'react'
import CodeEditor from '@/components/CodeEditor';
import "./create.css"
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

const Create = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Disable the button

        const postData = {
            userId: userId,
            name,
            description,
            category,
            htmlCode,
            cssCode
        };

        try {
            const response = await axios.post('/api/post', postData);
            if (response) {
                console.log("Post created Successfully", response);
                setSuccessMessage(true); // Show success message
                // Clear form fields
                setName('');
                setDescription('');
                setCategory('');
                setHtmlCode('');
                setCssCode('');

                // Hide success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error while creating post :', error);
        } finally {
            setIsSubmitting(false); // Enable the button
        }
    };

    return (
        <div className="create-page">
            <h1>Create a new Snippet</h1>
            <CodeEditor />

            <div className="snippet-form">
                {successMessage && (
                    <div className="success-message">
                        Your UI snippet has been submitted! You can view it on the browse page.
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Snippet Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting} // Disable the input fields
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            disabled={isSubmitting} // Disable the input fields
                        >
                            <option value="">Select a category</option>
                            <option value="Button">Button</option>
                            <option value="CheckBox">CheckBox</option>
                            <option value="Toggle Switches">Toggle Switches</option>
                            <option value="Card">Card</option>
                            <option value="Input">Input</option>
                            <option value="Loader">Loader</option>
                            <option value="Forms">Forms</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>HTML Code:</label>
                        <textarea
                            value={htmlCode}
                            onChange={(e) => setHtmlCode(e.target.value)}
                            disabled={isSubmitting} // Disable the input fields
                        />
                    </div>
                    <div>
                        <label>CSS Code:</label>
                        <textarea
                            value={cssCode}
                            onChange={(e) => setCssCode(e.target.value)}
                            disabled={isSubmitting} // Disable the input fields
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting......' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
