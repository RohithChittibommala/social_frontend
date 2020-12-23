import React, { useState } from "react";
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
  const [isHeadingFocussed, SetIsHeadingFocussed] = useState(false);
  const [isDescriptionFocussed, SetIsDescriptionFocussed] = useState(false);
  const [image, SetImage] = useState(null);
  const applyOnFocusStyles = { border: "1px solid lightblue" };
  const applyOnBlurStyles = { border: "none" };

  const handleImageUpload = ({ target: { files } }) => {
    const [uploadedImage] = files;
    const imageUrl = URL.createObjectURL(uploadedImage);
    SetImage(imageUrl);
  };
  return (
    <CreatePostDiv>
      <InputContainer>
        <InputLabel>Title</InputLabel>
        <CreatePostInput
          onFocus={() => SetIsHeadingFocussed(true)}
          onBlur={() => SetIsHeadingFocussed(false)}
          style={isHeadingFocussed ? applyOnFocusStyles : applyOnBlurStyles}
          type={"text"}
          placeholder={"Enter Title"}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Description</InputLabel>
        <PostDescription
          onFocus={() => SetIsDescriptionFocussed(true)}
          onBlur={() => SetIsDescriptionFocussed(false)}
          placeholder="Enter the post description"
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

      <SubmitButton>Submit</SubmitButton>
    </CreatePostDiv>
  );
}

export default Create;
