"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CodeEditor from '@/components/CodeEditor';
import "../../create/create.css";

const Edit = ({ params }) => {
    const [post, setPost] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/post/${params.id}`);
                const postData = response.data;
                setPost(postData);
                setName(postData.name);
                setDescription(postData.description);
                setCategory(postData.category);
                setHtmlCode(postData.htmlCode);
                setCssCode(postData.cssCode);
            } catch (error) {
                console.error("Error while fetching post for editing: ", error);
            }
        };

        fetchPost();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const updatedPost = {
            name,
            description,
            category,
            htmlCode,
            cssCode
        };

        try {
            const response = await axios.put(`/api/post/${params.id}`, updatedPost);
            if (response) {
                console.log("Post updated successfully", response);
                alert("Updated post successfully");
            }
        } catch (error) {
            console.error("Error while updating post: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page edit-page">
            <h1>Edit Snippet</h1>

            <CodeEditor
                htmlCode={htmlCode}
                setHtmlCode={setHtmlCode}
                cssCode={cssCode}
                setCssCode={setCssCode}
            />

            <div className="snippet-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Snippet Name:</label>
                        <input
                            maxLength="20"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            disabled={isSubmitting}
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
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Update Snippet'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
