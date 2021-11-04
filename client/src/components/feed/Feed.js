import Post from "../post/Post";
import { useState, useEffect, useContext, useRef } from "react";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

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
        console.log(res.data);
        // setPosts(
        //   res.data((x, y) => {
        //     return new Date(y.createdAt) - new Date(x.createdAt); //პოსტებს ალაგებს დრპის მიხედვით, ფიდი რო ახლები ზემოთ იყოს
        //   })
        // );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username, user]);
  console.log(user);
  console.log(username);
  posts.map((p) => console.log(p));
  return (
    <div className="feed">
      <div className="feedWrapper">
        {!username || username === user?.username ? <Share /> : ""}

        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
}
