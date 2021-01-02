import React, { useState } from "react";
import { imageAddress } from "../Profile/ProfileElements.jsx";
import {
  CardContent,
  CardDescription,
  CardDiv,
  CardHeader,
  CardHeaderImage,
  CardIconsDiv,
  CardImage,
  CardImageDiv,
  CardInput,
  CardTitle,
  FilledHeartIcon,
  OpenHeartIcon,
} from "./PostElements";

function Card() {
  const [isPostLiked, setIsPostLiked] = useState(false);
  return (
    <CardDiv>
      <CardHeader>
        <CardHeaderImage src={imageAddress} />
      </CardHeader>
      <CardImageDiv>
        <CardImage src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
      </CardImageDiv>
      <CardIconsDiv>
        {isPostLiked ? (
          <FilledHeartIcon
            size={30}
            onClick={() => setIsPostLiked((prev) => !prev)}
          />
        ) : (
          <OpenHeartIcon
            size={30}
            onClick={() => setIsPostLiked((prev) => !prev)}
          />
        )}
      </CardIconsDiv>
      <CardContent>
        <CardTitle>Enjoying my vacation</CardTitle>
        <CardDescription>just now landed in maldives</CardDescription>
        <CardInput />
      </CardContent>
    </CardDiv>
  );
}

export default Card;
