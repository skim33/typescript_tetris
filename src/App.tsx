import React from 'react';
import './App.css';
import {Tetris} from "./helpers/tetris";

function App() {
    const onClick = () => {
        const tetris = new Tetris();
        tetris.start();
        tetris.rotate();
    }

  return (
    <div className="App">
        <div className="content-wrapper">
            <canvas id="canvas" className="canvas"></canvas>
            <div className="right-content">
                <div className="score-box">1000</div>
                <button className="start-btn" id="start" onClick={onClick}>Start</button>
            </div>
        </div>
    </div>
  );
}

export default App;
