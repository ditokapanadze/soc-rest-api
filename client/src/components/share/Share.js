import "./share.css";
import React, { useContext, useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { Cancel } from "@material-ui/icons";
import Resizer from "react-image-file-resizer";

export default function Share() {
  const [desc, setDesc] = useState("");
  const [postImage, setPostImage] = useState("");
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("userId", user._id);
    formData.append("desc", desc);
    formData.append("postImage", postImage);
    // const newPost = {
    //   userId: user._id,
    //   desc,
    // };

    if (postImage) {
    }
    try {
      const res = await axios.post(
        "https://socmedia-rest.herokuapp.com/api/posts",
        formData
      );
      window.location.reload(); // ეს დორებითია. კონტექსტი უნდა შევქმნა მერე და პოსტები სთეითად გავიტანო
    } catch (err) {
      console.log(err);
    }
  };
  // ფოტოს რესიზს ვაკეთებ, დიდი ფაილები არ ითვირთება
  // const resizeFile = (file) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       1500,
  //       1500,
  //       "JPEG",
  //       100,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "base64"
  //     );
  //   });
  const uploadImage = async (e) => {
    try {
      const file = e.target.files[0];
      // const image = await resizeFile(file);
      setPostImage(file);
    } catch (err) {
      console.log(err);
    }
    // const file = e.target.files[0];
    // const base64 = await convertBase64(file);
    // setBaseImage(base64);
  };

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user?.profilePicture} alt="" />
          <input
            placeholder={`What's in your mind ${user?.username}?`}
            className="shareInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {postImage ? (
          <div className="shareImgContainer">
            <img
              className="imgPreview"
              src={postImage ? URL.createObjectURL(postImage) : ""}
              alt="ASd"
            />
            <Cancel className="cancelBtn" onClick={() => setPostImage(null)} />
          </div>
        ) : (
          ""
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="postImage" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              {/* <FileBase64
                className="baseInput"
                type="file"
                id="file"
                name="file"
                accept=".png, .jpeg, .jpg"
                multiple={false}
                onDone={({ base64 }) => setFile(base64)}
              /> */}
              <input
                style={{ display: "none" }}
                type="file"
                id="postImage"
                name="postImage"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
