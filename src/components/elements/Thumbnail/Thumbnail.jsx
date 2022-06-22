import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, CircularProgressLabel, Text } from '@chakra-ui/react';
import './Thumbnail.scss';

const Thumbnail = ({
  clickable,
  movieId,
  movieName,
  image,
  releaseDate,
  originalTitle,
  voteAverage
}) => {
  return (
    <div className="movie-thumbnail-block">
      {clickable ? (
        <Link to={{ pathname: `/movie/${movieId}`, movieName: `${movieName}` }}>
          <img src={image} alt={movieName} />
        </Link>
      ) : (
        <img src={image} alt={movieName} />
      )}
      {movieName ? (
        <div className="movie-thumbnail-description">
          <div className="movie-thumbnail-year">
           <Text color='whiteAlpha.900'>{releaseDate ? releaseDate.slice(0, 4) : null}</Text>
          </div>
          {clickable ? (
            <Link
              to={{ pathname: `/movie/${movieId}`, movieName: `${movieName}` }}
            >
              <h3>{movieName}</h3>
            </Link>
          ) : (
            <h3>{movieName}</h3>
          )}
          {originalTitle === movieName ? null : (
            <div className="movie-thumbnail-og-title">
              {' '}
              Original Title: {originalTitle}
            </div>
          )}
          {voteAverage ? (
            <div className="movie-average-score">
              <CircularProgress
                min={0}
                max={10}
                value={voteAverage}
                size="27px"
                trackColor="#1A202C"
                color={
                  voteAverage >= 7.5
                    ? 'green'
                    : voteAverage >= 5
                    ? 'yellow'
                    : 'red'
                }
                bgColor="rgba(0, 0, 0, .2)"
                borderRadius="50px"
                thickness={7}
              >
                <CircularProgressLabel
                  color="whiteAlpha.900"
                  fontWeight="700"
                  fontSize=".63rem"
                >
                  {voteAverage}
                </CircularProgressLabel>
              </CircularProgress>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Thumbnail;
