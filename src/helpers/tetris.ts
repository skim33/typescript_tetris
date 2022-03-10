const COLS = 10, ROWS = 20

class Tetris {
    private board: any[];
    private lose: boolean;
    private interval: number;
    private intervalRender: number;
    private current: [number[], number[]];
    private currentX: number;
    private currentY: number;
    private isFreezed: boolean;
    private shapes: [number[], number[], number[], number[], number[], number[], number[]];
    private colors: string[];

    constructor() {
        this.board = [];
        this.lose = false;
        this.interval = 0;
        this.intervalRender = 0;
        this.current = [[], []];
        this.currentX = 0;
        this.currentY = 0;
        this.isFreezed = false;
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
        if (!this.lose) {
            const shapeIdx = Math.floor(Math.random() * 7);
            this.board.push(this.shapes[shapeIdx]);
        }
    }
}

export { Tetris }