import React, { useState } from "react";
import "./Dictionary.css";
import axios from "axios";
import Results from "./Results";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function handleResponse(response) {
    setResults(response.data[0]);
  }
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function Search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;

    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Search();
  }
  function load() {
    setLoaded(true);
    Search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1> What word do you want to look up?</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="Search"
              onChange={handleKeywordChange}
              defaultValue={props.defaultKeyword}
              autoFocus={true}
            ></input>
          </form>
          <div className="hint">
            {" "}
            Suggested words: sunset, wine, yoga, plant
          </div>
        </section>
        <Results results={results} />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
