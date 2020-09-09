const remove = require('lodash/remove')

const movies = require('../data/movies.json')
const { generateId } = require('../utils')
const { searchMovies, filterMovies, sortMovies, paginateMovies, paginateSearchMovies } = require('../utils/search')

const getMovies = async (query) => {
  const foundMovies = searchMovies(movies, query)
  const filteredMovies = filterMovies(foundMovies, query)
  const sortedMovies = sortMovies(filteredMovies, query)
  return paginateMovies(sortedMovies, query)
}

const getMovieById = async (movieId) => {
  return movies.find((movie) => movie.id === movieId)
}

const getMovieBySearchString = async (string) => {
  const allFindMovies = []
  for (let i = 0; i < movies.length; i++) {
    const isSearchedMovie = movies[i].title.toUpperCase().includes(string.toUpperCase())
    if (isSearchedMovie) {
      allFindMovies.push(movies[i])
    }
  }
  return paginateSearchMovies(allFindMovies)
}

const deleteMovie = async (movieId) => {
  const removedElements = remove(movies, (m) => m.id === movieId)

  return removedElements.length
}

const addMovie = async (movie) => {
  const newMovie = {
    ...movie,
    id: generateId(),
  }

  movies.push(newMovie)

  return newMovie
}

const updateMovie = async (movie) => {
  const movieIndex = movies.findIndex((m) => m.id === movie.id)

  if (movieIndex < 0) {
    return null
  }

  movies[movieIndex] = movie

  return movie
}

module.exports = {
  getMovies,
  getMovieById,
  deleteMovie,
  addMovie,
  updateMovie,
  getMovieBySearchString,
}
