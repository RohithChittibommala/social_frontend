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
  SubmitButton,
  CreatePostInput,
} from "./ProfileElements";
import { Store } from "../state/Store";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";
import { updateUserData } from "../state/actionTypes";
import { useHistory } from "react-router-dom";
function Profile() {
  const history = useHistory();
  const [state, dispatch] = useContext(Store);
  const { userPosts: posts, user } = state;
  const [imageFile, setImageFile] = useState("");
  const { followers, following } = user;
  useEffect(() => {
    if (!state.isAuthenicated) history.push("/login");
  }, [posts, user, state.isAuthenicated]);

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
          <div>
            <CreatePostInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <SubmitButton onClick={postData}>Update</SubmitButton>
          </div>
        </ImageDiv>
        <ProfileInfoDiv>
          <ProfileName>{user.name}</ProfileName>
          <ProfileStatsDiv>
            {renderProfileStat(posts.length, "posts")}
            {renderProfileStat(followers?.length, "followers")}
            {renderProfileStat(following?.length, "following")}
          </ProfileStatsDiv>
        </ProfileInfoDiv>
      </Wrapper>
      <GalleryWrapper>
        {posts.map((post, index) =>
          post.url ? renderGalleryImageDiv(post.url, index) : null
        )}
      </GalleryWrapper>
    </div>
  );
}

export default Profile;
