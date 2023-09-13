import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const apiKey = process.env.REACT_APP_API_KEY;

const MovieDetail = (props) => {
  const [movieDets, setMovieDets] = useState(null);

  useEffect(() => {
    if (props.movieInfo) {
      // Fetch movie details only when movieInfo prop changes
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${props.movieInfo}?api_key=${apiKey}`
        )
        .then((response) => setMovieDets(response.data));
    }
  }, [props.movieInfo]);

  return (
    <Container data-testid="movie-detail">
      {movieDets ? (
        <>
          <CoverImage
            src={`https://image.tmdb.org/t/p/w500${movieDets.poster_path}`}
            data-testid="movie-poster"
          />
          <InfoColumn>
            <MovieName data-testid="movie-title">
              Title: {movieDets.title}
            </MovieName>
            <MovieInfo data-testid="movie-release-date">
              Release Date: {movieDets.release_date}
            </MovieInfo>
            <MovieInfo data-testid="movie-runtime">
              Runtime: {movieDets.runtime} minutes
            </MovieInfo>
            <MovieInfo data-testid="movie-overview">
              Overview: {movieDets.overview}
            </MovieInfo>
          </InfoColumn>
        </>
      ) : (
        <LoadingSpinner />
      )}
      <Close onClick={() => props.setMovieInfo()}>X</Close>
    </Container>
  );
};

export default MovieDetail;
