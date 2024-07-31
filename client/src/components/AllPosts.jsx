import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function AllPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/userPost/${user.id}`);
        if (response) {
          setUserPosts(response.data);
        }

      } catch (error) {
        console.error("Error while fetching user's posts: ", error);
      }
    }
    fetchPosts();
  }, [])

  const createIframeContent = (htmlCode, cssCode) => {
    const iframeDocument = `
            <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0; 
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f0f0f0;
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
    <div className="browse-page">
      <h1>All User's Snippets</h1>
      <div className="posts-container">
        {
          userPosts.map((post, index) => (
            <div key={post._id} className='posts-card'>
              <div className="card-header">
                <span className="ship-name">{post.name}</span>
                <Link href={`/snip-page/${post._id}`} className="get-code-btn">Get Code</Link>
              </div>
              <div className="card-body">
                <iframe
                  srcDoc={createIframeContent(post.htmlCode, post.cssCode)}
                  className="code-preview"
                  title={`Post ${index}`}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
              <div className="card-footer">
                <span className="user-name">User Name</span>
                <div className="footer-right">
                  <button className="like-btn">Like</button>
                  <span className="date-update">Date</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllPosts