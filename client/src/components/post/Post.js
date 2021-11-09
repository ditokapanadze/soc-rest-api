import "./post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { Link, useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { largePost } from "../../apiCalls";
export default function Post({ post, large }) {
  const [like, setLike] = useState();
  const [enlargeImg, setEnlargeImg] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [singlePost, setSinglePost] = useState([]);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let history = useHistory();
  const { user: currentUser, largeMode, dispatch } = useContext(AuthContext);
  const { id } = useParams();

  // შეიძლება გამომდგეს

  //
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
  //  ამოწმებს ქურენთ იუზერს უკვე ხომ არ ქვს დალაიქებული
  useEffect(() => {
    !large && setIsLiked(post?.likes?.includes(currentUser?._id));
  }, [currentUser?._id, post?.likes]);

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
  }, [post.userId, currentUser]);
  // სურათიანი პოსტის გახსნა

  const openPost = () => {
    setEnlargeImg(!enlargeImg);
  };

  return (
    <div className={`post ${large ? "large" : ""}`}>
      {!large ? (
        <div className={`postWrapper ${large ? "" : ""}`}>
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user?.username}`}>
                <img className="postProfileImg" src={user?.profilePicture} />
              </Link>
              <span className="postUsername">{user?.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post.desc}</span>
            <img
              className="postImg"
              onClick={() => history.push(`/post/${post?._id}`)}
              src={post.img}
            />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src={`${PF}like.png`}
                onClick={likeHandler}
              />
              <img
                className="likeIcon"
                src={`${PF}heart.png`}
                onClick={likeHandler}
              />
              <span className="postText">{post.desc}</span>
              <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} comments</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="large__wrapper">
          <HighlightOffIcon
            onClick={() => history.goBack()}
            style={{
              color: "white",
              marginLeft: "20px",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
          <div className="largepost__imgcontainer">
            {/* <span className="postText">{post?.desc}</span> */}
            <img
              className=""
              onClick={() => history.push(`/post/${post?._id}`)}
              src={post.img}
              alt="jhg"
            />
          </div>
          <div className="largepost__right">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user?.username}`}>
                  <img
                    className="postProfileImg"
                    src={user?.profilePicture}
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
            <p className="postText">{post.desc}</p>
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
                />{" "}
                <span className="postLikeCounter">{like} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
              </div>
            </div>
            <div className="larg__coment__container">
              <div className="coment__container">
                <img
                  className="postProfileImg"
                  src={user?.profilePicture}
                  alt=""
                />
                <div className="coment__content">
                  <span>dito kapanadze </span>
                  <p>dsfs dsfsdfs s s dfdsf sdfsdf sdf d sdfsdf dsfsfds</p>
                </div>
              </div>
              <div className="coment__container">
                <img
                  className="postProfileImg"
                  src={user?.profilePicture}
                  alt=""
                />
                <div className="coment__content">
                  <span>dito kapanadze </span>
                  <p>dsfs dsfsdfs s s dfdsf sdfsdf sdf d sdfsdf dsfsfds</p>
                </div>
              </div>
              <div className="coment__container">
                <img
                  className="postProfileImg"
                  src={user?.profilePicture}
                  alt=""
                />
                <div className="coment__content">
                  <span>dito kapanadze </span>
                  <p>dsfs dsfsdfs s s dfdsf sdfsdf sdf d sdfsdf dsfsfds</p>
                </div>
              </div>
              <div className="coment__container">
                <img className="postProfileImg" src={user?.profilePicture} />
                <div className="coment__content">
                  <span>dito kapanadze </span>
                  <p>dsfs dsfsdfs s s dfdsf sdfsdf sdf d sdfsdf dsfsfds</p>
                </div>
              </div>
              <form className="comment__form">
                <textarea placeholder="write a comment" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
