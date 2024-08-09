import PostList from './PostList';

function FavouritePosts({userId}) {
  return (
    <PostList
      apiUrl={`/api/fav/${userId}`}
      headingText={"Your favorite posts"}
    />
  )
}

export default FavouritePosts;