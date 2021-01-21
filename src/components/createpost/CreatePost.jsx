import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";
import { addNewPost } from "../state/actionTypes";
import { Store } from "../state/Store";

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
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [state, dispatch] = useContext(Store);

  const handleImageUpload = (e) => {
    const { target } = e;
    const { files } = target;
    const [uploadedImage] = files;
    setImageFile(uploadedImage);
    const imageUrl = URL.createObjectURL(uploadedImage);
    setImage(imageUrl);
  };

  const postData = async () => {
    if (!image) return createNewPost();
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "social-app");
    data.append("cloud_name", "rohith");
    try {
      const responseJSON = await fetch(
        "https://api.cloudinary.com/v1_1/rohith/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const { url } = await responseJSON.json();
      createNewPost(url);
    } catch (error) {
      //// handle errpr
    }
  };

  const createNewPost = async (url) => {
    try {
      const responseJSON = await fetch(
        "http://localhost:4000/posts/createpost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer:${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ description, url }),
        }
      );
      const data = await responseJSON.json();
      console.log(data);
      if (data.error) toast.error(`${data.error}`, toastEmmiterOptions);
      else {
        toast.success("successfully post uploaded", toastEmmiterOptions);
        dispatch(addNewPost(data));
        history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(description.length);
  return (
    <CreatePostDiv>
      <InputContainer>
        <InputLabel>Description</InputLabel>
        <PostDescription
          placeholder="Enter the post caption"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
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

      <SubmitButton
        disabled={description.length > 0 ? false : true}
        onClick={postData}
      >
        Submit
      </SubmitButton>
    </CreatePostDiv>
  );
}

export default Create;
