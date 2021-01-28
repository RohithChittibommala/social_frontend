import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";
import { addNewPost } from "../state/actionCreators";
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
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  useEffect(() => {
    if (!state.isAuthenicated) history.push("/login");
  }, [state.isAuthenicated, history]);

  const handleImageUpload = (e) => {
    const { target } = e;
    const { files } = target;
    const [uploadedImage] = files;
    setImageFile(uploadedImage);
    const imageUrl = URL.createObjectURL(uploadedImage);
    setImage(imageUrl);
  };

  const postData = async () => {
    setSubmitBtnDisabled(true);
    if (!image) return createNewPost();
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`);
    data.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
    try {
      const responseJSON = await fetch(
        `${process.env.REACT_APP_CLOUDINARY_URL}`,
        {
          method: "POST",
          body: data,
        }
      );
      const { url } = await responseJSON.json();
      createNewPost(url);
    } catch (error) {
      toast.error("some thing went wrong", error.message);
    }
  };

  const createNewPost = async (url) => {
    try {
      const responseJSON = await fetch(
        ` ${process.env.REACT_APP_API_URL}/posts/createpost`,
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
      if (data.error) toast.error(`${data.error}`, toastEmmiterOptions);
      else {
        dispatch(addNewPost(data));
        toast.success("successfully post uploaded", toastEmmiterOptions);
        history.push("/");
      }
    } catch (error) {
      toast.error("something went wrong", error.message);
    }
  };

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
        disabled={description.length <= 0 || submitBtnDisabled ? true : false}
        onClick={postData}
      >
        Submit
      </SubmitButton>
    </CreatePostDiv>
  );
}

export default Create;
