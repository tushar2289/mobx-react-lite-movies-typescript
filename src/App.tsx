import React, { useContext } from "react";
import "./App.css";
import Movies from "./components/Movies";
import Queue from "./components/Queue";
import { MoviesContext } from "./Movies-mobx";
import { observer } from "mobx-react-lite";

function App() {
  const { fetchAll } = useContext(MoviesContext);
  return (
    <>
      <button onClick={() => fetchAll()}>Fetch</button>
      <Movies />
      <Queue />
    </>
  );
}

export default observer(App);
