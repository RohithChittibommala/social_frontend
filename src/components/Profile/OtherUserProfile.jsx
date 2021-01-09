import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FollowButton,
  GalleryImage,
  GalleryImageDiv,
  GalleryImageOverlayDiv,
  GalleryWrapper,
  ImageDiv,
  ProfileImage,
  ProfileInfoDiv,
  ProfileName,
  ProfileNameContainer,
  ProfileStat,
  ProfileStatNum,
  ProfileStatsDiv,
  Wrapper,
} from "./ProfileElements";
import { Store } from "../state/Store";
import { updateUserData, userLoggedIn } from "../state/actionTypes";
const OtherUserProfile = () => {
  const [state, dispatch] = useContext(Store);
  const { user } = state;
  const { id } = useParams();
  console.log(user);
  const [userProfile, setUserProfile] = useState({});
  const [isUserFollowed, setIsUserFollowed] = useState();
  // if (user?.following?.includes(id)) setIsUserFollowed(true);
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer:${localStorage.getItem("jwt")}`,
        },
      })
        .then((responseJSON) => responseJSON.json())
        .then((res) => {
          setUserProfile(res);
          if (user?.following?.includes(id)) setIsUserFollowed(true);
        });
    }
  }, [id]);

  const handleUserFollow = async () => {
    const resJSON = await fetch("http://localhost:4000/users/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ id }),
    });
    const res = await resJSON.json();
    if (!res.error) {
      setUserProfile((prev) => ({ ...prev, user: res.followingUser }));
      dispatch(userLoggedIn(res.followerUser));
      setIsUserFollowed(true);
    }
  };
  const handleUserUnFollow = async () => {
    const resJSON = await fetch("http://localhost:4000/users/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ id }),
    });
    const res = await resJSON.json();
    if (!res.error) {
      setUserProfile((prev) => ({ ...prev, user: res.followingUser }));
      dispatch(updateUserData(res.followerUser));
      setIsUserFollowed(false);
    }
  };

  const renderProfileStat = (number, title) => (
    <ProfileStat>
      <ProfileStatNum>{number}</ProfileStatNum>
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
          <ProfileImage src={userProfile?.user?.imageUrl} />
        </ImageDiv>
        <ProfileInfoDiv>
          <ProfileNameContainer>
            <ProfileName>{userProfile?.user?.name}</ProfileName>
            <FollowButton
              onClick={isUserFollowed ? handleUserUnFollow : handleUserFollow}
            >
              {isUserFollowed ? "unfollow" : "follow"}
            </FollowButton>
          </ProfileNameContainer>
          <ProfileStatsDiv>
            {renderProfileStat(userProfile?.posts?.length, "posts")}
            {renderProfileStat(
              userProfile?.user?.followers?.length,
              "followers"
            )}
            {renderProfileStat(
              userProfile?.user?.following?.length,
              "following"
            )}
          </ProfileStatsDiv>
        </ProfileInfoDiv>
      </Wrapper>
      <GalleryWrapper>
        {userProfile?.posts?.map((post, index) =>
          post.url ? renderGalleryImageDiv(post.url, index) : null
        )}
      </GalleryWrapper>
    </div>
  );
};

export default OtherUserProfile;
