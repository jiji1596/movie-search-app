import { useState } from 'react'
import './App.css'

function MovieCard({movie}) {
  return (
  <div className="movie-card ">
    <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
    <div className="movie-info">
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  </div>
  )
}


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function search(event) {
    setSearchInput(event.currentTarget.value);
  }

  function searchClick() {
    setLoading(true);
    setError(null);
    const url = `http://www.omdbapi.com/?apikey=b74f1343&s=${searchInput}`


    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      })
      .catch(err => setError("Something went wrong."))
      .finally(() => setLoading(false));
  }


  return (
    <div className="w-100">
      <h1 className="mb-4 text-primary">Movie Picker</h1>
      <div className="d-flex gap-2 container justify-content-center mb-5">
        <input className="form-control" style={{ width: '400px' }} type="text" value={searchInput} onChange={search}/>
        <button className="btn btn-primary" onClick={searchClick}> Search </button>
      </div>
      {loading && <p className="text-secondary">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div>
      { movies.length > 0 &&
        <div className="row g-4">
          { movies.map((movie, i) => {
            return (
              <div key={i} className="col-12 col-sm-6 col-md-3 text-light">
                <MovieCard movie={movie} />
              </div>
            )
          })}
        </div>
      }
      </div>
    </ div>
  )
}

export default App
