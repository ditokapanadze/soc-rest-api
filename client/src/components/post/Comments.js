import { CommentTwoTone, PermDataSettingOutlined } from "@material-ui/icons";
import React, { useState, useRef, useEffect } from "react";
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

  const scrollRef = useRef();

  const { id } = useParams();
  const handleSubmit = async (e) => {
    // console.log(singlePost._id);

    if (e.which === 13 && !e.shiftKey && commentText.trim() !== "") {
      console.log(commentText.length);
      e.preventDefault();
      const info = {
        commentText,
        user_name: user.username,
        user_profilePicture: user.profilePicture,
      };
      let id;
      postId ? (id = postId) : (id = singlePost._id);
      console.log(id);
      try {
        const res = await axios.put(
          `http://localhost:5000/api/posts/comment/${user._id}/${id}`,
          { info }
        );
        postId ? fetchPost(postId) : fetchPost();
        setCommentText("");
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  });

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    setCommentText(commentText + emojiObject.emoji);
  };
  console.log();
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
        <img className="comments__img" src={user.profilePicture} />
        <SentimentSatisfiedIcon
          className="emoji__icon"
          onClick={() => setEmojiVisible(!emojiVisible)}
        />
        <form
          type="submit"
          className={singlePost ? "comment__form" : "small__form"}
        >
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