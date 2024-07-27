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
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            userId: userId,
            name,
            description,
            category,
            htmlCode,
            cssCode
        };

        try {
            const response = await axios.post('/api/post' , postData);
            if(response){
                console.log( "Post created Successfully" , response);
            }
        } catch (error) {
            console.error('Error while creating post :', error);
        }
    };

    return (
        <div className="create-page">
            <h1>Create a new Snippet</h1>

            <div className="snippet-form">
                <CodeEditor />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Snippet Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                        />
                    </div>
                    <div>
                        <label>CSS Code:</label>
                        <textarea
                            value={cssCode}
                            onChange={(e) => setCssCode(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Create;
