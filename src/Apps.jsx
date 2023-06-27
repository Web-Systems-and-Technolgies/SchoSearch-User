import { memo, useEffect, useState } from "react";
import { PostProvider, usePosts } from "../src/PostContext";
import signOutUser from "./pages/SuccessPage";

function Apps() {
  return (
    <section>
      <PostProvider>
        <Header />
        <Main />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <header>
      <div>
        <Results />
        <SearchPosts />
        <button
          onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
          className="btn-fake-dark-mode darkmode "
        >
          {isFakeDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
      />
      <button onClick={signOutUser}>Signout</button>
    </div>
  );
}

function Results() {
  const { posts } = usePosts();

  return (
    <p>
      <span className="countColor">{posts.length} </span>scholarships result
    </p>
  );
}

const Main = memo(function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

function FormAddPost() {
  const { onAddPost, onClearPosts } = usePosts();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [body, setBody] = useState("");
  const [moreinfo, setMoreinfo] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title || !location || !moreinfo) return;
    onAddPost({ title, location, body, moreinfo });
    setTitle("");
    setLocation("");
    setBody("");
    setMoreinfo("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Scholarship Name"
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        value={moreinfo}
        onChange={(e) => setMoreinfo(e.target.value)}
        placeholder="Link"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Post Scholar</button>
    </form>
  );
}

function Posts() {
  const { posts } = usePosts();

  return (
    <section>
      <List posts={posts} />
    </section>
  );
}

function List({ posts }) {
  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3 className="schotitle">{post.title}</h3>
            <h5 className="loc">
              <svg
                data-v-ba883567=""
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {post.location}
            </h5>
            <br />
            <p className="description">
              {post.body} <a href={post.moreinfo}>more info</a>
            </p>
            <br />
            <button className="deletebtn">Apply</button>
          </li>
        ))}
      </ul>
    </>
  );
}

function Footer() {
  return <footer>&copy; All rights reserved Schosearch</footer>;
}

export default Apps;
