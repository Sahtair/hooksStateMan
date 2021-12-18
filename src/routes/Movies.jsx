import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {MoviesContextProvider, useMoviesState} from '../context/movies';
import {useMoviesActions} from '../context/movies/useMoviesActions';
import {
  SET_MOVIES_LOADING,
  SET_MOVIES_LIST,
  SET_MOVIES_ERROR,
} from '../context/movies/actionTypes';

import {withContext} from '../components/withContext';
import {Loader} from '../components/loader';

const MoviesStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  background-color: #cca57d;

  .title {
    margin: 32px 0;
    font-size: 64px;
    color: #563421;
  }
`;

const MoviesListStyled = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MovieStyled = styled.li`
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #563421;
  background-color: #9a835e;

  :hover {
    background-color: #96705f;
  }

  .link {
    text-decoration: none;
    color: inherit;
  }
`;

const MoviesView = () => {
  console.log(useMoviesState, useMoviesState())
  const {
    state: {
      loading, movies,
    },
  } = useMoviesState();
  console.log(movies)
  const {fetchMovies} = useMoviesActions();

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MoviesStyled>
      <div className="title">Movies</div>
      {
      loading ?
      <Loader /> :
      (
      <MoviesListStyled>
        {
          movies.map((movie) => (
            <MovieStyled key={movie._id}>
              <Link className="link" data-testid={`link-to-${movie._id}`} to={`/movies/${movie._id}`}>
                {movie.name}
              </Link>
            </MovieStyled>
          ))
        }
      </MoviesListStyled>
      )
      }
    </MoviesStyled>
  );
};

export const Movies = withContext(MoviesContextProvider)(MoviesView);

