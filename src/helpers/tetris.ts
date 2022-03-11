const COLS = 10, ROWS = 20

class Tetris {
    private board: any[];
    private lose: boolean;
    private interval: number;
    private intervalRender: number;
    private current: any[];
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
        this.isFreezed = true;
        this.shapes = [
            [ 1, 1, 1, 1 ],
            [ 1, 1, 1, 0,
              1 ],
            [ 1, 1, 1, 0,
              0, 0, 1 ],
            [ 1, 1, 0, 0,
                 1, 1 ],
            [ 0, 1, 1, 0,
              1, 1, 0 ],
            [ 0, 1, 1, 0,
                 1, 1 ],
            [ 0, 1, 0, 0,
                 1, 1, 1 ]
        ];
        this.colors = ['cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'];
    }

    newShape(): void {
        const shapeIdx = Math.floor(Math.random() * this.shapes.length);
        const shape = this.shapes[shapeIdx];

        this.current = [];
        for (let y = 0; y < 4; y++) {
            this.current[y] = [];
            for (let x = 0; x < 4; x++) {
                let i = 4 * y + x;
                if (typeof shape[i] !== "undefined" && shape[i]) {
                    this.current[y][x] = shapeIdx + 1;
                } else {
                    this.current[y][x] = 0;
                }
            }
        }

        console.log(this.current);

        this.isFreezed = false;
        this.currentX = 5;
        this.currentY = 0;
    }

    clearBoard(): void {
        for (let y = 0; y < ROWS; y++) {
            this.board[y] = [];
            for (let x = 0; x < COLS; x++) {
                this.board[y][x] = 0;
            }
        }
    }

    rotate(): any[] {
        const cur = this.current[0].map((col: [], c: number) => this.current.map((row: [], r: number) => this.current[r][3 - c]));
        console.log(cur);
        return cur;
    }

    freeze(): void {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.current[y][x]) {
                    this.board[y + this.currentY][x + this.currentX] = this.current[y][x];
                }
            }
        }
    }

    start(): void {
        this.newShape();
    }


}

export { Tetris }