import React, { useEffect, useContext } from "react";
import {
  GalleryImage,
  GalleryImageDiv,
  GalleryImageOverlayDiv,
  GalleryWrapper,
  ImageDiv,
  ProfileImage,
  ProfileInfoDiv,
  ProfileName,
  ProfileStat,
  ProfileStatNum,
  ProfileStatsDiv,
  Wrapper,
} from "./ProfileElements";
import imageAddress from "../assets/download.jpg";
import { Store } from "../state/Store";
function Profile() {
  const [state] = useContext(Store);
  const { userPosts: posts, user } = state;
  useEffect(() => {
    console.log(posts, user);
  }, [posts]);

  const renderProfileStat = (number, title) => (
    <ProfileStat>
      <ProfileStatNum>{number}k</ProfileStatNum>
      {title}
    </ProfileStat>
  );
  const renderGalleryImageDiv = (src, key) => (
    <GalleryImageDiv key={key}>
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
          <ProfileName>{user.name}</ProfileName>
          <ProfileStatsDiv>
            {renderProfileStat(12, "posts")}
            {renderProfileStat(80, "followers")}
            {renderProfileStat(120, "following")}
          </ProfileStatsDiv>
        </ProfileInfoDiv>
      </Wrapper>
      <GalleryWrapper>
        {posts.map((post, index) => renderGalleryImageDiv(post.url, index))}
      </GalleryWrapper>
    </div>
  );
}

export default Profile;
