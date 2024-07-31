import PostList from './PostList';

function AllPosts({userId}) {

  return (
    <PostList
      apiUrl={`/api/post/userPost/${userId}`}
      headingText={"User's Snippet"}
    />
  )
}

export default AllPosts;