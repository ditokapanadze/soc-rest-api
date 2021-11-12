import Post from "../post/Post";
import { useState, useEffect, useContext, useRef } from "react";
import Share from "../share/Share";
import { Link, useHistory, useParams } from "react-router-dom";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  console.log(user);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const res = username
        //   ?
        //   : await axios.get(
        //       "http://localhost:5000/api/posts/timeline/" + user._id
        //     );
        if (username) {
          const res = await axios.get(
            "http://localhost:5000/api/posts/profile/" + username
          );
          console.log(res.data);
          setPosts(res.data);
        } else {
          const res = await axios.get(
            "http://localhost:5000/api/posts/timeline/" + user._id
          );
          setPosts(res.data);
        }

        // setPosts(
        //   res.data((x, y) => {
        //     return new Date(y.createdAt) - new Date(x.createdAt); //პოსტებს ალაგებს დრპის მიხედვით, ფიდი რო ახლები ზემოთ იყოს
        //   })
        // );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username, user]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [id]);
  console.log(post);
  return (
    <div className="feed">
      <div className={`feedWrapper ${id ? "largeWrapper" : ""}`}>
        {(!username || username === user?.username) && !id ? <Share /> : ""}
        {id ? (
          <Post post={post} large={true} />
        ) : (
          posts?.map((post) => <Post post={post} />)
        )}
      </div>
    </div>
  );
}
