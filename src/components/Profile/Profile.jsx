import React, { useEffect, useContext, useState } from "react";
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
  ModalTitle,
  ProfileNameDiv,
  EditProfileButton,
  ShowFollowersAndFollowing,
  ModalUserImage,
  ModalItem,
  ModalUserName,
  ModalUserImageDiv,
  GalleryImageLikes,
  GalleryImageLikesContainer,
} from "./ProfileElements";
import { Store } from "../state/Store";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";
import { updateUserData } from "../state/actionTypes";
import { useHistory } from "react-router-dom";
import { FilledHeartIcon } from "../posts/PostElements";
function Profile() {
  const history = useHistory();
  const [state, dispatch] = useContext(Store);
  const { userPosts: posts, user } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "", data: [] });
  const [imageFile, setImageFile] = useState("");
  const { followers, following } = user;
  useEffect(() => {
    if (!state.isAuthenicated) history.push("/login");
  }, [posts, history, state.isAuthenicated]);

  const renderProfileStat = (number, title) => (
    <ProfileStat
      onClick={
        title !== "posts"
          ? function () {
              setModalData({ name: title, data: user[title] });
              setIsModalOpen(true);
            }
          : null
      }
    >
      <ProfileStatNum>{number}</ProfileStatNum>
      {title}
    </ProfileStat>
  );

  const renderModelItem = (imageUrl, name, id) => (
    <ModalItem key={id}>
      <ModalUserImageDiv>
        <ModalUserImage src={imageUrl} />
      </ModalUserImageDiv>
      <ModalUserName to={`/profile/${id}`}>{name}</ModalUserName>
    </ModalItem>
  );

  const renderGalleryImageDiv = (post, key) => (
    <GalleryImageDiv key={key}>
      <GalleryImageOverlayDiv>
        <GalleryImageLikesContainer>
          <FilledHeartIcon size={22} />
          <GalleryImageLikes>{post.likes.length}</GalleryImageLikes>
        </GalleryImageLikesContainer>
      </GalleryImageOverlayDiv>
      <GalleryImage src={post.url} />
    </GalleryImageDiv>
  );
  const handleImageUpload = (e) => {
    const { target } = e;
    const { files } = target;
    const [uploadedImage] = files;
    setImageFile(uploadedImage);
  };
  const postData = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "social-app");
    data.append("cloud_name", "rohith");
    try {
      const responseJSON = await fetch(
        "https://api.cloudinary.com/v1_1/rohith/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const { url } = await responseJSON.json();
      updateProfileImage(url);
    } catch (error) {
      //// handle errpr
    }
  };
  const updateProfileImage = async (url) => {
    try {
      const responseJSON = await fetch("http://localhost:4000/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer:${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ url }),
      });
      const data = await responseJSON.json();
      console.log(data);
      if (data.error) toast.error(`${data.error}`, toastEmmiterOptions);
      else {
        toast.success("profile  updated", toastEmmiterOptions);
        dispatch(updateUserData(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Wrapper>
        <ImageDiv>
          <ProfileImage src={state?.user?.imageUrl} />
        </ImageDiv>
        <ProfileInfoDiv>
          <ProfileNameDiv>
            <ProfileName>{user.name}</ProfileName>
            <EditProfileButton>Edit Profile</EditProfileButton>
          </ProfileNameDiv>
          <ProfileStatsDiv>
            {renderProfileStat(posts.length, "posts")}
            {renderProfileStat(followers?.length, "followers")}
            {renderProfileStat(following?.length, "following")}
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
        {posts.map((post, index) =>
          post.url ? renderGalleryImageDiv(post, index) : null
        )}
      </GalleryWrapper>
    </div>
  );
}

export default Profile;
