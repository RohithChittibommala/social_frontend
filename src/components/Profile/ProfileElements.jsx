import styled from "styled-components";

export const imageAddress = `https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60 `;
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
  flex: 0.3;
  display: flex;
  justify-content: center;
  width: 160px;
  padding: 0% 1% 2%;
`;
export const ProfileInfoDiv = styled.div`
  flex: 0.7;
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

  width: 180px;
  border-radius: 50%;
`;
export const ProfileName = styled.h1`
  ${profileFont};
  font-weight: 300;
  color: #333;
`;
export const ProfileStatsDiv = styled.div`
  display: flex;
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
  margin: 10px;
  cursor: pointer;
`;
export const GalleryImage = styled.img`
  max-width: 100%;
  height: auto;
  width: auto\9;
`;
