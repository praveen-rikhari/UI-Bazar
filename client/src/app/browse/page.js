import PostList from "@/components/PostList";

const Browse = () => {
    return (
        <PostList
            apiUrl={'/api/post'}
            headingText={"All Snippets"}
        />
    )
}

export default Browse;