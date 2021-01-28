import styled from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";
export const Wrapper = styled.div`
  display: flex;
  width: 62.5%;
  padding: 2% 1%;
  margin: 0 auto;
  margin-top: 100px;
  border-bottom: 1px solid #dbdbdb;
`;

export const EditProfileButton = styled.button`
  background-color: transparent;
  color: #333;
  outline: none;
  border: 1px solid #616060;

  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  height: 35px;
  transition: 0.5s ease-in all;
  /* width: 90px; */
  font-size: 15px;
`;

export const ImageDiv = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 160px;
  padding: 0% 1% 2%;
`;

export const ShowFollowersAndFollowingModal = styled(Modal)`
  height: 400px;
  width: 400px;
  margin: 150px auto;
  position: relative;
  padding: 15px 20px;
  border-radius: 30px;
  outline: none;
  background: #fff;
`;
export const EditProfileOptionsModal = styled(Modal)`
  height: auto;
  width: 400px;
  margin: 150px auto;
  position: relative;
  padding: 15px 20px;
  border-radius: 12px;
  outline: none;
  background: #fff;
`;
export const EditProfileOption = styled.h1`
  color: #ed4956;
  padding: 4px 8px;
  cursor: pointer;
  border-bottom: 1px solid #dbdbdb;
  line-height: 1.5;
  min-height: 48px;
  vertical-align: middle;
  font-size: 16px;
  padding: 12px;
  text-align: center;
`;
export const ModalTitle = styled.h2`
  text-align: center;
  position: relative;
  margin: 0 auto;
  /* left: 30px; */
  padding: 6px 3px;
  font-family: "Franklin Gothic Medium", sans-serif;
  font-weight: lighter;
  border-bottom: 1px solid #000;
`;
export const ProfileInfoDiv = styled.div`
  flex: 0.6;
  margin-left: 15px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ModalItem = styled.div`
  padding: 6px 8px;
  height: 48px;
  align-items: center;
  border-bottom: 1px solid rgba(239, 239, 239, 1);
  display: flex;
`;
export const ModalUserImage = styled.img`
  width: 30px;
  object-fit: "contain";
  border-radius: 50%;
`;
export const ModalUserImageDiv = styled.div`
  width: 30px;
  height: 34px;
`;
export const ModalUserName = styled(Link)`
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
  text-decoration: none;
  color: #333;
  font-family: "Montserrat";
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
export const ProfileImage = styled.img`
  height: 180px;
  display: flex;
  object-fit: contain;
  width: 180px;
  border-radius: 50%;
`;
export const ProfileNameDiv = styled.div`
  display: flex;
  padding: 5px 12px;
  /* width: 250px; */
  align-items: center;
  justify-content: flex-start;
`;
export const ProfileName = styled.h1`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: lighter;
  font-size: 30px;
  padding: 2px;
  /* margin-left: 150px; */
  color: #333;
  margin-right: 25px;
`;
export const ProfileStatsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const ProfileStat = styled.p`
  margin-right: 25px;
  font-weight: normal;
  font-size: 19px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
  color: #000;
  cursor: pointer;
`;
export const ProfileStatNum = styled.span`
  margin-right: 10px;
  font-weight: bold;
  font-size: 19px;
  color: #000;
  cursor: pointer;
`;
export const GalleryWrapper = styled.div`
  max-width: 970px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
export const GalleryImageDiv = styled.div`
  width: 290px;
  height: auto;
  margin: 10px;
  position: relative;
  cursor: pointer;
`;

export const GalleryImageLikesContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 5;
  align-items: center;
  justify-content: center;
  opacity: 0;
  width: 100%;
  height: 100%;
  &:hover {
    opacity: 1;
  }
`;

export const GalleryImageLikes = styled.h1`
  font-size: 24px;
  color: #fff;
  font-family: "Acme", sans-serif;
  font-weight: 100;
`;
export const GalleryImageOverlayDiv = styled.div`
  width: 100%;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }
  &:hover:after {
    opacity: 1;
  }
`;
export const GalleryImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const ProfileNameContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;
export const FollowButton = styled.button`
  background-color: #2e7ed8;
  color: #fff;
  outline: none;
  border: none;
  margin: 0 50px;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  height: 35px;
  transition: 0.5s ease-in all;
  width: 90px;
  font-size: 15px;
  &:hover {
    background-color: #0e4e97;
  }
`;
export const SubmitButton = styled.button`
  display: block;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75em;
  letter-spacing: 1px;
  height: 38px;
  color: #fff;
  width: 120px;
  outline: none;
  line-height: 38px;
  overflow: hidden;
  background: #4dbecf;
  border-radius: 3px;
  box-shadow: 0 15px 30px rgba(black, 0.1);
  border: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 15px 60px;
  &:hover,
  &:focus {
    box-shadow: 0 5px 15px rgba(black, 0.1);
  }
`;
export const CreatePostInput = styled.input`
  padding: 12px;
  font-size: 18px;
  width: 100%;
  &:focus {
    border: 1px solid blue;
  }
`;
export const ModalStyles = {
  overlay: {
    backgroundColor: "rgba(63, 59, 59, 0.75)",
  },
};

export const UpdateProfilePicModal = styled(Modal)`
  height: auto;
  width: 400px;
  margin: 150px auto;
  position: relative;
  padding: 15px 20px;
  border-radius: 30px;
  outline: none;
  background: #fff;
`;
export const UpdatePasswordModal = styled(Modal)`
  height: 200px;
  width: 400px;
  margin: 150px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  padding: 15px 20px;
  border-radius: 30px;
  outline: none;
  background: #fff;
`;
