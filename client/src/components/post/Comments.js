import { PermDataSettingOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import axios from "axios";
import "./comments.css";

export default function Comments({ user, singlePost, fetchPost }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState();
  console.log(user);
  console.log(singlePost);

  const handleSubmit = async (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      const info = {
        commentText,
        user_name: user.username,
        user_profilePicture: user.profilePicture,
      };
      try {
        const res = await axios.put(
          `http://localhost:5000/api/posts/comment/${user._id}/${singlePost._id}`,
          { info }
        );
        fetchPost();
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(comments);
  return (
    <div className="larg__coment__container">
      {singlePost?.comments?.length === 0 && (
        <div className="coment__container">
          <div className="coment__content">
            <p>Noone has commented on this post yet</p>{" "}
          </div>
        </div>
      )}
      {singlePost?.comments?.map((comment) => (
        <div className="coment__container">
          <img className="postProfileImg" src={comment.user_profilePicture} />
          <div className="coment__content">
            <span>dito kapanadze </span>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
      {/* <img className="postProfileImg" src={user?.profilePicture} />
        <div className="coment__content">
          <span>dito kapanadze </span>
          <p>dsfs dsfsdfs s s dfdsf sdfsdf sdf d sdfsdf dsfsfds</p>
        </div> */}

      <form type="submit" className="comment__form">
        <textarea
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
          onKeyPress={(e) => handleSubmit(e)}
          placeholder="write a comment"
        />
      </form>
    </div>
  );
}
