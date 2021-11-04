import "./post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { Link, useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { largePost } from "../../apiCalls";
export default function Post({ post, large }) {
  const [like, setLike] = useState(post?.likes?.length);
  const [enlargeImg, setEnlargeImg] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let history = useHistory();
  const { user: currentUser, largeMode, dispatch } = useContext(AuthContext);
  const { id } = useParams();
  //  ამოწმებს ქურენთ იუზერს უკვე ხომ არ ქვს დალაიქებული
  useEffect(() => {
    setIsLiked(post?.likes?.includes(currentUser._id));
  }, [currentUser?._id, post.likes]);

  const likeHandler = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/${post._id}/like`,
        { userId: currentUser._id }
      );
    } catch (err) {
      console.log(err);
    }
  };
  console.log(large);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users?userId=${post.userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [post.userId]);
  // სურათიანი პოსტის გახსნა

  const openPost = () => {
    setEnlargeImg(!enlargeImg);
  };

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchPost();
  // }, [id]);

  return (
    <div className={`post ${large ? "large_post" : ""}`}>
      <div className={`postWrapper ${large ? "large_postWrapper" : ""}`}>
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user?.username}`}>
              <img
                className="postProfileImg"
                src={
                  user?.profilePicture
                    ? PF + user?.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            onClick={() => history.push(`/post/${post?._id}`)}
            src={post.img}
            alt="jhg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
