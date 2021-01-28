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
  ShowFollowersAndFollowingModal,
  ModalUserImage,
  ModalItem,
  ModalUserName,
  ModalUserImageDiv,
  GalleryImageLikes,
  GalleryImageLikesContainer,
  UpdateProfilePicModal,
  UpdatePasswordModal,
  CreatePostInput,
  EditProfileOptionsModal,
  EditProfileOption,
  EditProfileButton,
  ModalStyles,
  FollowButton as SubmitButton,
} from "./ProfileElements";
import { Store } from "../state/Store";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";
import { updateUserData } from "../state/actionCreators";
import { useHistory } from "react-router-dom";
import { FilledHeartIcon } from "../posts/PostElements";
import { FormInput, InputContainer } from "../Login_Register/LoginElements";
function Profile() {
  const history = useHistory();
  const [state, dispatch] = useContext(Store);
  const { userPosts: posts, user } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "", data: [] });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imageFile, setImageFile] = useState("");
  const { followers, following } = user;
  const [isEditProfileModalOpen, setEditProfileModal] = useState(false);
  const [isImgModalOpen, setImageModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (!state.isAuthenicated) history.push("/login");
  }, [posts, history, state.isAuthenicated]);

  const handleProfileStat = (title) => {
    if (title !== "posts") {
      setModalData({ name: title, data: user[title] });
      setIsModalOpen(true);
    }
  };
  console.log(followers, following);
  const renderProfileStat = (number, title) => (
    <ProfileStat onClick={() => handleProfileStat(title)}>
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
  console.log(imageFile);
  const postData = async () => {
    setImageModalOpen(false);
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`);
    data.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
    try {
      const responseJSON = await fetch(
        `${process.env.REACT_APP_CLOUDINARY_URL}`,
        {
          method: "POST",
          body: data,
        }
      );
      const { url } = await responseJSON.json();
      updateProfileImage(url);
    } catch (error) {
      //// handle errorr
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const resJSON = await fetch(
        `${process.env.REACT_APP_API_URL}/updatepassword/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: state?.user?.email,
            oldPassword,
            newPassword,
          }),
        }
      );
      const res = await resJSON.json();

      if (res.error) toast.error(res.error, toastEmmiterOptions);
      else toast.success(res.msg, toastEmmiterOptions);
    } catch (error) {}
  };

  const updateProfileImage = async (url) => {
    try {
      const responseJSON = await fetch(
        `${process.env.REACT_APP_API_URL}/users/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer:${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ url }),
        }
      );
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
            <EditProfileButton onClick={() => setEditProfileModal(true)}>
              Edit Profile
            </EditProfileButton>
          </ProfileNameDiv>
          <ProfileStatsDiv>
            {renderProfileStat(posts?.length, "posts")}
            {renderProfileStat(followers?.length, "followers")}
            {renderProfileStat(following?.length, "following")}
          </ProfileStatsDiv>
        </ProfileInfoDiv>
      </Wrapper>
      <ShowFollowersAndFollowingModal
        style={ModalStyles}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <ModalTitle>{modalData.name}</ModalTitle>
        {modalData?.data?.map((user) =>
          renderModelItem(user.imageUrl, user.name, user._id)
        )}
      </ShowFollowersAndFollowingModal>
      <EditProfileOptionsModal
        style={ModalStyles}
        isOpen={isEditProfileModalOpen}
        onRequestClose={() => setEditProfileModal(false)}
      >
        <EditProfileOption
          onClick={() => {
            setEditProfileModal(false);
            setImageModalOpen(true);
          }}
        >
          Update Profile Pic
        </EditProfileOption>
        <EditProfileOption
          onClick={() => {
            setEditProfileModal(false);
            setPasswordModalOpen(true);
          }}
        >
          Change Password
        </EditProfileOption>
      </EditProfileOptionsModal>
      <UpdateProfilePicModal
        style={ModalStyles}
        isOpen={isImgModalOpen}
        onRequestClose={() => setImageModalOpen(false)}
      >
        <CreatePostInput
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {imageFile && <SubmitButton onClick={postData}>Upload</SubmitButton>}
      </UpdateProfilePicModal>
      <UpdatePasswordModal
        style={ModalStyles}
        isOpen={isPasswordModalOpen}
        onRequestClose={() => setPasswordModalOpen(false)}
      >
        <InputContainer>
          <FormInput
            placeholder="enter old password"
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <FormInput
            placeholder="enter new password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </InputContainer>
        {oldPassword && newPassword && (
          <SubmitButton onClick={handlePasswordUpdate}>Update</SubmitButton>
        )}
      </UpdatePasswordModal>
      <GalleryWrapper>
        {posts.map((post, index) =>
          post.url ? renderGalleryImageDiv(post, index) : null
        )}
      </GalleryWrapper>
    </div>
  );
}

export default Profile;
