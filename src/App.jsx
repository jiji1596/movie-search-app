import { useState } from 'react'
import './App.css'

function MovieCard({movie}) {
  return (
  <div className="movie-card ">
    <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
    <div className="movie-info">
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <p className="movie-type">{movie.Type}</p>
    </div>
  </div>
  )
}


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  function search(event) {
    setSearchInput(event.currentTarget.value);
  }

  function searchClick() {
    const url = `http://www.omdbapi.com/?apikey=b74f1343&s=${searchInput}`

    setSearchQuery(searchInput);
    fetch(url).then(response => response.json())
    .then((data) => {
      setMovies(data.Search);
      console.log(data.Search);
    })
  }


  return (
    <>
      <input type="text" value={searchInput} onChange={search}/>
      <button className="btn btn-primary" onClick={searchClick}> Search </button>
      { movies.length > 0 &&
        <div className="row g-4">
          { movies.map((movie, i) => {
            return (
              <div key={i} className="col-12 col-sm-6 col-md-3">
                <MovieCard movie={movie} />
              </div>
            )
          })}
        </div>
      }
    </>
  )
}

export default App
