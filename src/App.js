import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Oval } from "react-loader-spinner";
import { loadMovie, addMovie, removeMovie, updateMovie } from "./reducers";

function App() {
  const movies = useSelector((state) => _.get(state, "movies"));
  const loading = useSelector((state) => _.get(state, "loading"));
  const dispatch = useDispatch();
  //states
  const [idToEdit, setIdToEdit] = useState();
  const [name, setName] = useState();
  const [comment, setComment] = useState();
  const [genre, setGenre] = useState("Action");
  const [rating, setRating] = useState("0");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(loadMovie());
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name && comment && !isEditing) {
      const id = (movies.length + _.random(5000)).toString();
      const movie = { id, name, comment, genre, rating };
      dispatch(addMovie(movie));
      setName("");
      setComment("");
    }
    if (isEditing) {
      const movie = { id: idToEdit, name, comment, genre, rating };
      dispatch(updateMovie(movie));
      setIdToEdit("");
      setIsEditing(false);
    }
  };

  const onEditHandler = (id) => {
    const { name, comment, genre, rating } = _.find(
      movies,
      (el) => el.id === id
    );
    setIdToEdit(id);
    setName(name);
    setComment(comment);
    setGenre(genre);
    setRating(rating);
    setIsEditing(true);
  };

  const onDeleteHandler = (id) => {
    const movieToDelete = _.find(movies, (el) => el.id === id);
    dispatch(removeMovie(movieToDelete));
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const onChangeGenre = (e) => {
    setGenre(e.target.value);
  };
  const onChangeRating = (e) => {
    setRating(e.target.value);
  };
  const renderSection = _.map(movies, ({ id, name, comment, rating }) => {
    if (loading)
      return (
        <div className="App">
          <Oval color="#00BFFF" height={500} width={500} />
        </div>
      );
    return (
      <div key={id} className="container">
        <div className="name">
          <em className="em">{name}</em>
          {[...Array(Number(rating))].map((e, i) => (
            <span key={i} className="fa fa-star checked"></span>
          ))}
          {[...Array(5 - Number(rating))].map((e, i) => (
            <span key={i} className="fa fa-star"></span>
          ))}
          <div className="mini-container">
            <button
              class="button button-outline"
              style={{ color: "purple" }}
              onClick={() => onEditHandler(id)}
            >
              Edit
            </button>
            <button
              class="button button-outline"
              style={{ color: "purple" }}
              onClick={() => onDeleteHandler(id)}
            >
              Delete
            </button>
          </div>
        </div>
        <blockquote className="details">
          <em>{comment}</em>
        </blockquote>
      </div>
    );
  });
  return (
    <React.Fragment>
      <div className="App">
        <form>
          <fieldset>
            <label for="nameField">Movie Name</label>
            <input
              type="text"
              placeholder="Enter Movie Name Here"
              id="nameField"
              value={name}
              onChange={(e) => handleName(e)}
            />
            <label for="commentField">Movie Details</label>
            <textarea
              placeholder="Enter Movie Details Here"
              id="commentField"
              value={comment}
              onChange={(e) => handleComment(e)}
            ></textarea>
            <label for="genre">Genre</label>
            <select id="genre" value={genre} onChange={(e) => onChangeGenre(e)}>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
              <option value="Horror">Horror</option>
            </select>
            <label for="rating">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => onChangeRating(e)}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button
              class="button button-primary"
              type="submit"
              onClick={onSubmitHandler}
            >
              {isEditing ? "UPDATE" : "SUBMIT"}
            </button>
          </fieldset>
        </form>
      </div>
      {renderSection}
    </React.Fragment>
  );
}

export default App;
