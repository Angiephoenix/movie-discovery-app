import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width: 700px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [query, setQuery] = useState();
  const [timeoutId, setTimeoutId] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [movieInfo, setMovieInfo] = useState();

const fetchData = async (query = "") => {
  try {
     // Construct the API endpoint based on whether there's a query or not
  const endpoint = query
  ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=vote_average.desc&vote_count.gte=1000&page=1`;

const response = await axios.get(endpoint);

setSearchResults(response.data.results.slice(0, 10));
}
 catch(error){
    console.log("Error fetching data:", error);
  }
}
 

useEffect(() => {
  fetchData(); // Fetch top 10 movies on page load
}, []); // Empty dependency array to run this effect once



  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    setQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    setTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName href="/home">
          <MovieImage src="/movie-icon.svg" alt="movie-icon"/>
          Movie Discovery App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" alt="search-icon"/>
          <SearchInput
            placeholder="Movie Search"
            onChange={onTextChange}
            value={query}
          />
        </SearchBox>
      </Header>
      {movieInfo && (
        <MovieDetail movieInfo={movieInfo} setMovieInfo={setMovieInfo} />
      )}
      <MovieListContainer>
        {searchResults.length > 0 ? (
          searchResults.map((movieReq) => (
            <MovieCard
              key={movieReq.id}
              movie={movieReq}
              setMovieInfo={setMovieInfo}
            />
          ))
        ) : (
          <h2 id="feedback">Sorry, no movie with such title was found!</h2>
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
