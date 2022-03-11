import React from 'react';
import './App.css';
import {Tetris} from "./helpers/tetris";

function App() {
  const tetris = new Tetris();
  tetris.newShape();
  tetris.rotate();

  return (
    <div className="App">
      <canvas id="canvas" width={300} height={600}></canvas>
      <button className="start-btn">Start</button>

    </div>
  );
}

export default App;
