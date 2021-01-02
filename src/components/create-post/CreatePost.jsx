import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../configs/toastSettings";
import {
  CreatePostDiv,
  CreatePostInput,
  InputContainer,
  InputLabel,
  PostDescription,
  SubmitButton,
  UploadedImage,
} from "./CreateElements";
function Create() {
  const [isTitleFocussed, setIsTitleFocussed] = useState(false);
  const [isDescriptionFocussed, setIsDescriptionFocussed] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const applyOnFocusStyles = { border: "1px solid lightblue" };
  const applyOnBlurStyles = { border: "none" };
  const history = useHistory();
  const handleImageUpload = (e) => {
    const { target } = e;
    const { files } = target;
    const [uploadedImage] = files;
    setImageFile(uploadedImage);
    const imageUrl = URL.createObjectURL(uploadedImage);
    setImage(imageUrl);
  };
  const postData = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "social-app");
    data.append("cloud_name", "rohith");
    const responseJSON = await fetch(
      "https://api.cloudinary.com/v1_1/rohith/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const { url } = await responseJSON.json();
    postNewPost(url);
  };
  const postNewPost = async (url) => {
    try {
      const responseJSON = await fetch(
        "http://localhost:4000/posts/createpost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer:${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ url, title, description }),
        }
      );
      const data = await responseJSON.json();
      console.log(data);
      if (data.error) toast.error(`${data.error}`, toastEmmiterOptions);
      else toast.success("successfully post uploaded", toastEmmiterOptions);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CreatePostDiv>
      <InputContainer>
        <InputLabel>Title</InputLabel>
        <CreatePostInput
          onFocus={() => setIsTitleFocussed(true)}
          onBlur={() => setIsTitleFocussed(false)}
          onChange={({ target }) => setTitle(target.value)}
          style={isTitleFocussed ? applyOnFocusStyles : applyOnBlurStyles}
          type={"text"}
          placeholder={"Enter Title"}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Description</InputLabel>
        <PostDescription
          onFocus={() => setIsDescriptionFocussed(true)}
          onBlur={() => setIsDescriptionFocussed(false)}
          placeholder="Enter the post description"
          onChange={({ target }) => setDescription(target.value)}
          style={isDescriptionFocussed ? applyOnFocusStyles : applyOnBlurStyles}
          cols="37"
          rows="5"
        />
      </InputContainer>
      <InputContainer>
        <UploadedImage src={image} />
        <CreatePostInput
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </InputContainer>

      <SubmitButton onClick={postData}>Submit</SubmitButton>
    </CreatePostDiv>
  );
}

export default Create;
