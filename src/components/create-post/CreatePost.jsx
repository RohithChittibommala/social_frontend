import React, { useState } from "react";
import {
  CreatePostDiv,
  CreatePostInput,
  InputContainer,
  InputLabel,
  PostDescription,
} from "./CreateElements";

function Create() {
  const [isHeadingFocussed, SetIsHeadingFocussed] = useState(false);
  const [isDescriptionFocussed, SetIsDescriptionFocussed] = useState(false);
  const applyOnFocusStyles = { border: "1px solid lightblue" };
  const applyOnBlurStyles = { border: "none" };
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
        <CreatePostInput type="file" accept="image/*" />
      </InputContainer>
    </CreatePostDiv>
  );
}

export default Create;
