import React from "react";
import {
  GalleryImage,
  GalleryImageDiv,
  GalleryImageOverlayDiv,
  GalleryWrapper,
  imageAddress,
  ImageDiv,
  ProfileImage,
  ProfileInfoDiv,
  ProfileName,
  ProfileStat,
  ProfileStatNum,
  ProfileStatsDiv,
  Wrapper,
} from "./ProfileElements";

function Profile() {
  const renderProfileStat = (number, title) => (
    <ProfileStat>
      <ProfileStatNum>{number}k</ProfileStatNum>
      {title}
    </ProfileStat>
  );
  const renderGalleryImageDiv = (src) => (
    <GalleryImageDiv>
      <GalleryImageOverlayDiv />
      <GalleryImage src={src} />
    </GalleryImageDiv>
  );
  return (
    <div>
      <Wrapper>
        <ImageDiv>
          <ProfileImage src={imageAddress} />
        </ImageDiv>
        <ProfileInfoDiv>
          <ProfileName>adireddyofficial</ProfileName>
          <ProfileStatsDiv>
            {renderProfileStat(12, "posts")}
            {renderProfileStat(80, "followers")}
            {renderProfileStat(120, "following")}
          </ProfileStatsDiv>
        </ProfileInfoDiv>
      </Wrapper>
      <GalleryWrapper>
        {renderGalleryImageDiv(
          "https://images.unsplash.com/photo-1608503808149-19e92ec6d7e4?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        )}
        {renderGalleryImageDiv(
          "https://images.unsplash.com/photo-1608503808149-19e92ec6d7e4?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        )}
        {renderGalleryImageDiv(
          "https://images.unsplash.com/photo-1608503808149-19e92ec6d7e4?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        )}
        {renderGalleryImageDiv(
          "https://images.unsplash.com/photo-1608503808149-19e92ec6d7e4?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        )}
        {renderGalleryImageDiv(
          "https://images.unsplash.com/photo-1608503808149-19e92ec6d7e4?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        )}
        {renderGalleryImageDiv(
          "https://images.unsplash.com/photo-1608503808149-19e92ec6d7e4?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        )}
      </GalleryWrapper>
    </div>
  );
}

export default Profile;
