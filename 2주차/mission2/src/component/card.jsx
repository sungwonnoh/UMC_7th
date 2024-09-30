import { useState } from "react";
import { MOVIES } from "../mocks/api";

export default function Card() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const onMouseEnter = (movie) => {
    setSelectedMovie(movie);
  };

  const onMouseLeave = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div style={{ width: "auto", marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {MOVIES.results.map((movie, i) => (
            <div
              key={i}
              onMouseEnter={() => onMouseEnter(movie)}
              onMouseLeave={onMouseLeave}
            >
              <div>
                {selectedMovie === movie ? (
                  <div
                    style={{
                      position: "absolute",
                      width: "130px",
                      height: "200px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  ></div>
                ) : null}
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  style={{
                    width: "130px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
