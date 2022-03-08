const COLS = 10, ROWS = 20

class Tetris {
    board: [];
    lose: boolean;
    interval: number;
    intervalRender: number;
    current: [number[], number[]];
    currentX: number;
    currentY: number;
    freezed: boolean;
    shapes: [number[], number[], number[], number[], number[], number[], number[]];
    colors: string[];

    constructor() {
        this.board = [];
        this.lose = false;
        this.interval = 0;
        this.intervalRender = 0;
        this.current = [[], []];
        this.currentX = 0;
        this.currentY = 0;
        this.freezed = false;
        this.shapes = [
            [ 1, 1, 1, 1 ],
            [ 1, 1, 1, 0,
              1 ],
            [ 1, 1, 1, 0,
              0, 0, 1 ],
            [ 1, 1, 0, 0,
                 1, 1 ],
            [ 1, 1, 0, 0,
              0, 1, 1 ],
            [ 0, 1, 1, 0,
                 1, 1 ],
            [ 0, 1, 0, 0,
                 1, 1, 1 ]
        ];
        this.colors = ['cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'];
    }

    newShape() {

    }
}

export { Tetris }