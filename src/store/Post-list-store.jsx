import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => { },
  deletePost: () => { },
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.Postid
    );
  } else if (action.type === "ADD_INITIAL_POST") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchpostList] = useReducer(postListReducer, []);

  const addPost = (post) => {
    dispatchpostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addinitialPosts = (posts) => {
    dispatchpostList({
      type: "ADD_INITIAL_POST",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (Postid) => {
    dispatchpostList({
      type: "DELETE_POST",
      payload: { Postid },
    });
  };

  const [fetching, Setfetching] = useState(false);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPosts = async () => {
      Setfetching(true); // Set fetching to true when request starts
      setError(null); // Clear any previous errors

      try {
        const response = await fetch("https://dummyjson.com/posts", { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        addinitialPosts(data.posts); // Add posts to state
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError(err.message); // Set error state if any error occurs
      } finally {
        Setfetching(false); // Set fetching to false when request finishes
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider value={{ postList, fetching, error, addPost, deletePost }}>
      {children}
      {error && <p>Error: {error}</p>} {/* Display error if there is one */}
    </PostList.Provider>
  );
};

export default PostListProvider;
