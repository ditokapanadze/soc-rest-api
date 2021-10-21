import Post from "../post/Post";

import { useState, useEffect } from "react";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(
              "http://localhost:5000/api/posts/profile/" + username
            )
          : await axios.get(
              "http://localhost:5000/api/posts/timeline/616508750294372f3b502ec5"
            );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username]);

}

export default function Feed() {

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />

        {posts.map((p) => (
          <Post key={p._id} post={p} />

        ))}
      </div>
    </div>
  );
}
