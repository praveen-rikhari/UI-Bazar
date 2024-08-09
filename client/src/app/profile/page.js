"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import './Profile.css';
import FavouritePosts from "@/components/FavouritePosts";
import AllPosts from "@/components/AllPosts";

export default function Profile() {
    const [activeTab, setActiveTab] = useState('posts');
    const { isLoaded, isSignedIn, user } = useUser();
    console.log(user);

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div className="profile-container">
            <div className="left-panel">
                <div className="profile-info">
                    <img src={user.imageUrl} alt="Profile" className="profile-image" />
                    <h2>{user.fullName}</h2>
                    <p>{user.emailAddresses[0].emailAddress}</p>
                </div>
                <div className="tabs">
                    <button onClick={() => setActiveTab('posts')}>All Posts</button>
                    <button onClick={() => setActiveTab('favourites')}>Favourites</button>
                </div>
            </div>
            <div className="right-panel">
                {activeTab === 'posts' ? <AllPosts userId={user.id} /> : <FavouritePosts userId={user.id}/>}
            </div>
        </div>
    );
};