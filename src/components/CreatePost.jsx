import { useContext, useRef } from "react";
import { PostList } from "../store/Post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const userIdElement = useRef();
  const PostTitleElement = useRef();
  const PostbodyElement = useRef();
  const reactionsElement = useRef();
  const TagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const PostTitle = PostTitleElement.current.value;
    const Postbody = PostbodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const Tags = TagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    PostTitleElement.current.value = "";
    PostbodyElement.current.value = "";
    reactionsElement.current.value = "";
    TagsElement.current.value = "";

    // addPost(userId, PostTitle, Postbody, reactions, Tags);

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: PostTitle,
        body: Postbody,
        reactions: reactions,
        userId: userId,
        tags: Tags,
        /* other post data */
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
      });
  };
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="UserId" className="form-label">
          Enter your UserId here
        </label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control"
          id="UsetId"
          placeholder="Your User Id"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={PostTitleElement}
          className="form-control"
          id="title"
          placeholder="Hou are you feeling today "
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          rows={4}
          type="text"
          ref={PostbodyElement}
          className="form-control"
          id="body"
          placeholder="Tells Us more about it "
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of reactions
        </label>
        <input
          type="text"
          ref={reactionsElement}
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this Post "
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          ref={TagsElement}
          className="form-control"
          id="tag"
          placeholder="Please enter tags using space "
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
