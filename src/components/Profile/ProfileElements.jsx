import styled from "styled-components";
const profileFont = `
  font-family: "Dosis", sans-serif;
`;
export const Wrapper = styled.div`
  display: flex;
  width: 62.5%;
  padding: 2% 1%;
  margin: 0 auto;
  border-bottom: 1px solid #dbdbdb;
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
export const ProfileInfoDiv = styled.div`
  flex: 0.6;
  ${profileFont};
  margin-left: 15px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const ProfileImage = styled.img`
  height: 180px;
  display: flex;
  object-fit: contain;
  width: 180px;
  border-radius: 50%;
`;
export const ProfileName = styled.h1`
  ${profileFont};
  font-weight: 300;
  margin-left: 150px;
  color: #333;
`;
export const ProfileStatsDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const ProfileStat = styled.p`
  margin-right: 25px;
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
  display: inline-block;
  margin-left: 1px;
  letter-spacing: 1px;
  color: #1f2226;
`;
export const ProfileStatNum = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #000;
  margin-right: 10px;
  font-family: "Noto Sans JP", sans-serif;
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
  height: 290px;
  margin: 10px;
  position: relative;
  cursor: pointer;
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
