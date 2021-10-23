import Post from "../post/Post";
import { useState, useEffect, useContext, useRef } from "react";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(username);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(
              "http://localhost:5000/api/posts/profile/" + username
            )
          : await axios.get(
              "http://localhost:5000/api/posts/timeline/" + user._id
            );
        setPosts(
          res.data((x, y) => {
            return new Date(y.createdAt) - new Date(x.createdAt); //პოსტებს ალაგებს დრპის მიხედვით, ფიდი რო ახლები ზემოთ იყოს
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {!username || username === user.username ? <Share /> : ""}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
