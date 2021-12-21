import "./post.css";
import { MoreVert } from "@material-ui/icons";
import Comments from "./Comments";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { Link, useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import { largePost } from "../../apiCalls";
export default function Post({ post, large }) {
  const [like, setLike] = useState(post?.likes?.length);
  const [longPost, setLongPost] = useState(false);
  const [slicePost, setSlicePost] = useState("");
  const [enlargeImg, setEnlargeImg] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [singlePost, setSinglePost] = useState([]);
  const [user, setUser] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let history = useHistory();
  const { user: currentUser, largeMode, dispatch } = useContext(AuthContext);
  const { id } = useParams();

  // შეიძლება გამომდგეს
  const fetchPost = async (postId) => {
    if (id) {
      try {
        const res = await axios.get(
          `https://socmedia-rest.herokuapp.com/api/posts/${id}`
        );
        setSinglePost(res.data);
        setLike(res.data.likes.length);
      } catch (err) {
        console.log(err.response);
      }
    } else {
      try {
        const res = await axios.get(
          `https://socmedia-rest.herokuapp.com/api/posts/${postId}`
        );
        setComments(res.data.comments);
        // setLike(res.data.likes.length);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  useEffect(() => {
    large && fetchPost();
  }, [id]);
  //  ამოწმებს ქურენთ იუზერს უკვე ხომ არ ქვს დალაიქებული
  useEffect(() => {
    setIsLiked(post?.likes?.includes(currentUser?._id));
  }, [currentUser?._id, post?.likes]);

  const likeHandler = async () => {
    try {
      const res = await axios.put(
        `https://socmedia-rest.herokuapp.com/api/posts/${post._id}/like`,
        { userId: currentUser._id }
      );

      if (res.data.likes) {
        setLike(res.data.likes.length);
      } else {
        setLike((prevState) => prevState - 1);
      }

      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://socmedia-rest.herokuapp.com/api/users?userId=${post.userId}`,
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

  const LikeText = () => {
    if (isLiked && like > 1) {
      return (
        <p className="postLikeCounter">you and {like - 1} people, like this</p>
      );
    } else if (isLiked && like === 1) {
      return <p>you like this</p>;
    }
    return <p>be first to like this post</p>;
  };
  const handleClick = (postId) => {
    setShowComments(!showComments);
    fetchPost(postId);
  };
  // ვამოწმებთ რამხელაა პოსტი რომ იმის მიხედვით გამოვაჩინოთ ან დავმალოთ Read More ღილაკი

  useEffect(() => {
    if (post?.desc?.length > 400) {
      setLongPost(true);
      setSlicePost(post?.desc.slice(0, 400));
    }
  }, [post]);

  return (
    <div className={`post ${large ? "large" : ""}`}>
      {!large ? (
        <div key={post._id} className={`postWrapper ${large ? "" : ""}`}>
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
            <p className="postText">
              {longPost ? slicePost + "... " : post.desc}

              {!longPost && post.desc.length > 400 ? (
                <span onClick={() => setLongPost(!longPost)}>
                  {" "}
                  <br />
                  Show Less{" "}
                </span>
              ) : (
                ""
              )}
              {longPost ? (
                <span onClick={() => setLongPost(!longPost)}>Read More</span>
              ) : (
                ""
              )}
            </p>

            <img
              className="postImg"
              onClick={() => history.push(`/post/${post?._id}`)}
              src={post.img}
            />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <ThumbUpAltIcon
                onClick={likeHandler}
                className={`likeIcon ${isLiked ? "" : "liked"}`}
              />
              <LikeText />
            </div>
            <div className="postBottomRight">
              <span
                onClick={(e) => handleClick(post._id)}
                className="postCommentText"
              >
                {post?.comments?.length} comments
              </span>
            </div>
          </div>
          {showComments ? (
            <Comments
              postId={post._id}
              user={user}
              comments={comments}
              fetchPost={fetchPost}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="large__wrapper">
          <HighlightOffIcon
            className="close__icon"
            onClick={() => history.goBack()}
            // style={{
            //   color: "white",
            //   marginLeft: "20px",
            //   fontSize: "30px",
            //   cursor: "pointer",
            // }}
          />
          <div className="largepost__imgcontainer">
            {/* <span className="postText">{post?.desc}</span> */}
            <img
              className=""
              onClick={() => history.push(`/post/${singlePost?._id}`)}
              src={singlePost.img}
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
                <span className="postDate">{format(singlePost.createdAt)}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
            </div>
            <p className="postText large__postText">
              {longPost ? slicePost + "... " : post?.desc}

              {!longPost && post?.desc?.length > 400 ? (
                <span onClick={() => setLongPost(!longPost)}>
                  {" "}
                  <br />
                  Show Less{" "}
                </span>
              ) : (
                ""
              )}
              {longPost ? (
                <span onClick={() => setLongPost(!longPost)}>Read More</span>
              ) : (
                ""
              )}
            </p>
            <div className="postBottom">
              <div className="postBottomLeft">
                <div className="postBottomLeft">
                  <ThumbUpAltIcon
                    onClick={likeHandler}
                    className={`likeIcon ${isLiked ? "" : "liked"}`}
                  />
                  <LikeText />
                </div>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">
                  {singlePost.comment} comments
                </span>
              </div>
            </div>
            <Comments
              user={user}
              singlePost={singlePost}
              fetchPost={fetchPost}
            />
          </div>
        </div>
      )}
    </div>
  );
}
