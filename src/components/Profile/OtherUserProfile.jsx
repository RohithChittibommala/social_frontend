import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  ShowFollowersAndFollowingModal,
  ModalTitle,
  ModalUserImage,
  ModalItem,
  ModalUserName,
  ModalUserImageDiv,
  Wrapper,
} from "./ProfileElements";
import { FilledHeartIcon } from "../posts/PostElements";
import { Store } from "../state/Store";
import { updateUserData } from "../state/actionCreators";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";

const OtherUserProfile = () => {
  const [state, dispatch] = useContext(Store);
  const { user } = state;
  const { id } = useParams();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "", data: [] });
  const [userProfile, setUserProfile] = useState({});
  const [isUserFollowed, setIsUserFollowed] = useState(false);

  useEffect(() => {
    if (!state.isAuthenicated) {
      history.push("/login");
    } else if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer:${localStorage.getItem("jwt")}`,
        },
      })
        .then((responseJSON) => responseJSON.json())
        .then((res) => {
          setUserProfile(res);
          if (res.user.followers.some((u) => u._id === user._id))
            setIsUserFollowed(true);
        })
        .catch((err) => toast.error(err, toastEmmiterOptions));
    }
  }, [id, state.isAuthenicated, history, user?.following, user?._id]);

  const handleUserFollow = async () => {
    const resJSON = await fetch(
      `${process.env.REACT_APP_API_URL}/users/follow`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer:${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ id }),
      }
    );
    const res = await resJSON.json();

    if (!res.error) {
      setUserProfile((prev) => ({ ...prev, user: res.followedUser }));
      localStorage.setItem("user", JSON.stringify(res.currentUser));
      dispatch(updateUserData(res.currentUser));
      setIsUserFollowed(true);
    }
  };
  const handleProfileStat = (title) => {
    if (title !== "posts") {
      setModalData({ name: title, data: userProfile?.user[title] });
      setIsModalOpen(true);
    }
  };
  const handleUserUnFollow = async () => {
    const resJSON = await fetch(
      `${process.env.REACT_APP_API_URL}/users/unfollow`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer:${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ id }),
      }
    );
    const res = await resJSON.json();
    if (!res.error) {
      setUserProfile((prev) => ({ ...prev, user: res.unfollowedUser }));
      dispatch(updateUserData(res.currentUser));
      localStorage.setItem("user", JSON.stringify(res.currentUser));
      setIsUserFollowed(false);
    }
  };
  const renderProfileStat = (number, title) => (
    <ProfileStat onClick={() => handleProfileStat(title)}>
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
            {userProfile?.user && (
              <FollowButton
                onClick={isUserFollowed ? handleUserUnFollow : handleUserFollow}
              >
                {isUserFollowed ? "unfollow" : "follow"}
              </FollowButton>
            )}
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
      <ShowFollowersAndFollowingModal
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
      </ShowFollowersAndFollowingModal>
      <GalleryWrapper>
        {userProfile?.posts?.map((post, index) =>
          post.url ? renderGalleryImageDiv(post, index) : null
        )}
      </GalleryWrapper>
    </div>
  );
};
export default OtherUserProfile;
