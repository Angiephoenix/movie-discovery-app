import React, { useState } from "react";
import styled from "styled-components";
import FavoriteButton from "./FavouriteBtn";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const API_IMG = "https://image.tmdb.org/t/p/w500";

const MovieCard = ( props ) => {
  const [isFavorite, setIsFavorite] = useState(false);

    const {
      title,
      poster_path,
      release_date,
      vote_average,
      id,
    } = props.movie;

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };

    const handleCardClick = () => {
        props.setMovieInfo(id); // Passing the movie ID to the parent component
      };

      return (
        <MovieContainer data-testid="movie-card" onClick={handleCardClick}>
          <CoverImage src={API_IMG + poster_path} data-testid="movie-poster" />
          <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
          <MovieName data-testid="movie-title">{title}</MovieName>
          <InfoColumn>
            <MovieInfo data-testid="movie-release-date">Release Date: {release_date}</MovieInfo>
            <MovieInfo>Vote: {vote_average}</MovieInfo>
          </InfoColumn>
        </MovieContainer>
      );
      
}

export default MovieCard;