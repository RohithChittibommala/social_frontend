import React from "react";
import { imageAddress } from "../Profile/ProfileElements";
import {
  CardContent,
  CardDiv,
  CardHeader,
  CardHeaderImage,
  CardImage,
  CardImageDiv,
} from "./CardElements";

function Card() {
  return (
    <CardDiv>
      <CardHeader>
        <CardHeaderImage src={imageAddress} />
      </CardHeader>
      <CardImageDiv>
        <CardImage src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
      </CardImageDiv>
      <CardContent></CardContent>
    </CardDiv>
  );
}

export default Card;
