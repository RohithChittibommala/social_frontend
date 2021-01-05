import styled from "styled-components";
export const CreatePostInput = styled.input`
  padding: 12px;
  font-size: 18px;
  width: 100%;
  &:focus {
    border: 1px solid blue;
  }
`;
export const CreatePostDiv = styled.div`
  margin: 10px auto;
  max-width: 500px;
`;
export const InputContainer = styled.div`
  margin: 40px auto;
  width: 400px;
`;
export const InputLabel = styled.h3`
  font-size: 20px;
  margin: 10px 0;
  text-align: left;
  text-transform: capitalize;
`;

export const PostDescription = styled.textarea`
  resize: none;
  padding: 12px;
  font-size: 18px;
  &:focus {
    border: 1px solid blue;
  }
`;
export const UploadedImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
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
