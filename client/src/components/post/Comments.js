import { CommentTwoTone, PermDataSettingOutlined } from "@material-ui/icons";
import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./comments.css";
import Picker from "emoji-picker-react";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { AuthContext } from "../../context/AuthContext";

export default function Comments({
  user,
  singlePost,
  fetchPost,
  postId,
  comments,
}) {
  const [commentText, setCommentText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiVisible, setEmojiVisible] = useState(false);
  console.log(emojiVisible);
  const scrollRef = useRef();

  const { user: currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    // console.log(singlePost._id);

    if (e.which === 13 && !e.shiftKey && commentText.trim() !== "") {
      e.preventDefault();
      const info = {
        commentText,
        user_name: user.username,
        user_profilePicture: user.profilePicture,
      };
      let id;
      postId ? (id = postId) : (id = singlePost._id);

      try {
        const res = await axios.put(
          `https://socmedia-rest.herokuapp.com/api/posts/comment/${user._id}/${id}`,
          { info }
        );
        console.log(res.data);
        postId ? fetchPost(postId) : fetchPost();
        setCommentText("");
        setEmojiVisible(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  });

  const onEmojiClick = (event, emojiObject) => {
    setCommentText(commentText + emojiObject.emoji);
  };

  return (
    <div
      className={
        singlePost ? "larg__coment__container " : "small__coment__container"
      }
      // style={singlePost?.comments?.length  === 0&& { flexDirection: "column" }}
      style={{ flexDirection: singlePost?.comments?.length === 0 && "column" }}
    >
      {singlePost?.comments?.length === 0 && comments?.length === 0 && (
        <div className={singlePost ? "coment__container" : ""}>
          <div className={singlePost ? "coment__content" : ""}>
            <p>No one has commented on this post yet</p>{" "}
          </div>
        </div>
      )}
      {comments?.length === 0 ||
        (singlePost?.length === 0 && (
          <div className={singlePost ? "coment__container" : ""}>
            <div className={singlePost ? "coment__content" : ""}>
              <p>No one has commented on this post yet</p>{" "}
            </div>
          </div>
        ))}

      {singlePost?.comments?.map((comment) => (
        <div className="coment__container" ref={scrollRef}>
          <img className="postProfileImg" src={comment.user_profilePicture} />
          <div className="coment__content">
            <span>{comment.user_name}</span>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}

      {/* {comments?.map((comment) => (
        <div className="coment__container" ref={scrollRef}>
          <img className="postProfileImg" src={comment.user_profilePicture} />
          <div className="coment__content">
            <span>dito kapanadze </span>
            <p>{comment.text}</p>
          </div>
        </div>
      ))} */}
      <div className="form__container">
        {!singlePost && (
          <img className="comments__img" src={currentUser.profilePicture} />
        )}

        <form
          type="submit"
          className={singlePost ? "comment__form" : "small__form"}
        >
          <SentimentSatisfiedIcon
            className="emoji__icon"
            onClick={() => setEmojiVisible(!emojiVisible)}
          />
          <textarea
            required
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            onKeyPress={(e) => handleSubmit(e)}
            placeholder="write a comment"
          />

          {emojiVisible && (
            <Picker
              className="emoji__container"
              groupVisibility={{
                flags: false,
              }}
              onEmojiClick={onEmojiClick}
            />
          )}
        </form>
      </div>

      {comments?.map((comment) => (
        <div className="coment__container">
          <img className="postProfileImg" src={comment.user_profilePicture} />
          <div className="coment__content">
            <span>{comment.user_name}</span>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
