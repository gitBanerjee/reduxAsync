import _ from "lodash";
import axios from "axios";

//initial state
const intialState = {
  movies: [],
  loading: false,
  error: undefined,
};

//actions
export const ADD_MOVIE = "ADD_MOVIE";
export const REMOVE_MOVIE = "REMOVE_MOVIE";
export const UPDATE_MOVIE = "UPDATE_MOVIE";
export const FETCH_MOVIE = "FETCH_MOVIE";
export const LOAD_MOVIE = "LOAD_MOVIE";

//action creators

export const loadMovie = () => {
  return async (dispatch) => {
    dispatch({ type: LOAD_MOVIE, payload: [] });
    setTimeout(async () => {
      const { data } = await axios.get("http://localhost:3006/movies");
      dispatch({ type: FETCH_MOVIE, payload: data });
    }, 1000);
  };
};

export const addMovie = (movie) => {
  return async (dispatch) => {
    dispatch({ type: LOAD_MOVIE, payload: [] });
    await axios.post("http://localhost:3006/movies", movie);
    dispatch({ type: ADD_MOVIE, payload: movie });
  };
};

export const removeMovie = (movie) => {
  return async (dispatch) => {
    dispatch({ type: LOAD_MOVIE, payload: [] });
    await axios.delete(`http://localhost:3006/movies/${movie.id}`);
    dispatch({ type: REMOVE_MOVIE, payload: movie });
  };
};

export const updateMovie = (movie) => {
  return async (dispatch) => {
    dispatch({ type: LOAD_MOVIE, payload: [] });
    await axios.put(`http://localhost:3006/movies/${movie.id}`, movie);
    dispatch({ type: UPDATE_MOVIE, payload: movie });
  };
};

export default function rootReducer(state = intialState, action) {
  switch (action.type) {
    case LOAD_MOVIE:
      return { ...state, loading: true };
    case FETCH_MOVIE:
      return { ...state, movies: action.payload, loading: false };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        loading: false,
      };
    case REMOVE_MOVIE:
      const updatedMovies = _.filter(
        state.movies,
        (el) => el.id !== action.payload.id
      );
      return { ...state, movies: updatedMovies, loading: false };
    case UPDATE_MOVIE:
      const updatedMoviesList = _.filter(
        state.movies,
        (el) => el.id !== action.payload.id
      );
      return {
        ...state,
        movies: [...updatedMoviesList, action.payload],
        loading: false,
      };
    default:
      return state;
  }
}
