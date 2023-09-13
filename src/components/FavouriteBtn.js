import React from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa"; // Assuming you have an icon library like react-icons

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px; /* Adjust the top value to position the button as needed */
  right: 10px; /* Adjust the right value to position the button as needed */
`;

const HeartButton = styled.button`
  background: rgba(255, 255, 255, 0.3);
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeartIcon = styled(FaHeart)`
  font-size: 30px;
  color: ${(props) => (props.isFavorite ? "red" : "white")};
`;

const FavoriteButton = ({ isFavorite, toggleFavorite }) => {
  return (
    <ButtonContainer>
      <HeartButton onClick={toggleFavorite}>
        <HeartIcon isFavorite={isFavorite} />
      </HeartButton>
    </ButtonContainer>
  );
};

export default FavoriteButton;
