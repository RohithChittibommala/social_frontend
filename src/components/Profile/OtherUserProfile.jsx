import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FollowButton,
  GalleryImage,
  GalleryImageDiv,
  GalleryImageOverlayDiv,
  GalleryImageLikes,
  GalleryImageLikesContainer,
  GalleryWrapper,
  ImageDiv,
  ProfileImage,
  ProfileInfoDiv,
  ProfileName,
  ProfileNameContainer,
  ProfileStat,
  ProfileStatNum,
  ProfileStatsDiv,
  ShowFollowersAndFollowing,
  ModalTitle,
  ModalUserImage,
  ModalItem,
  ModalUserName,
  ModalUserImageDiv,
  Wrapper,
} from "./ProfileElements";
import { FilledHeartIcon } from "../posts/PostElements";
import { Store } from "../state/Store";
import { addOtherUserData, updateUserData } from "../state/actionTypes";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";

const OtherUserProfile = () => {
  const [state, dispatch] = useContext(Store);
  const { user, otherFetchedUsers } = state;
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "", data: [] });
  const [userProfile, setUserProfile] = useState({});
  const [isUserFollowed, setIsUserFollowed] = useState(false);

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
          console.log("network request made");
          if (res.user.followers.some((u) => u._id === user._id))
            setIsUserFollowed(true);
        })
        .catch((err) => toast.error(err, toastEmmiterOptions));
    }
  }, [id, user?.following, user?._id]);

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
      setUserProfile((prev) => ({ ...prev, user: res.followedUser }));
      // dispatch(addOtherUserData({ id, data: res.followedUser }));
      dispatch(updateUserData(res.currentUser));
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
      setUserProfile((prev) => ({ ...prev, user: res.unfollowedUser }));
      dispatch(updateUserData(res.currentUser));
      // dispatch(addOtherUserData({ id, data: res.unfollowedUser }));
      setIsUserFollowed(false);
    }
  };

  console.log(userProfile);

  const renderProfileStat = (number, title) => (
    <ProfileStat
      onClick={
        title !== "posts" &&
        (() => {
          setModalData({ name: title, data: userProfile?.user?.[title] });
          setIsModalOpen(true);
        })
      }
    >
      <ProfileStatNum>{number}</ProfileStatNum>
      {title}
    </ProfileStat>
  );
  const renderGalleryImageDiv = (post, key) => (
    <GalleryImageDiv key={key}>
      <GalleryImageOverlayDiv>
        <GalleryImageLikesContainer>
          <FilledHeartIcon size={22} />
          <GalleryImageLikes>{post?.likes?.length}</GalleryImageLikes>
        </GalleryImageLikesContainer>
      </GalleryImageOverlayDiv>
      <GalleryImage src={post.url} />
    </GalleryImageDiv>
  );
  const renderModelItem = (imageUrl, name, id) => (
    <ModalItem key={id}>
      <ModalUserImageDiv>
        <ModalUserImage src={imageUrl} />
      </ModalUserImageDiv>
      <ModalUserName to={`/profile/${id}`}>{name}</ModalUserName>
    </ModalItem>
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
      <ShowFollowersAndFollowing
        style={{
          overlay: {
            backgroundColor: "rgba(63, 59, 59, 0.75)",
          },
        }}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <ModalTitle>{modalData.name}</ModalTitle>
        {modalData?.data?.map((user) =>
          renderModelItem(user.imageUrl, user.name, user._id)
        )}
      </ShowFollowersAndFollowing>
      <GalleryWrapper>
        {userProfile?.posts?.map((post, index) =>
          post.url ? renderGalleryImageDiv(post, index) : null
        )}
      </GalleryWrapper>
    </div>
  );
};
export default OtherUserProfile;
