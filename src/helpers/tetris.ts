const COLS = 10, ROWS = 20

class Tetris {
    private readonly board: any[];
    private lose: boolean;
    private interval: NodeJS.Timeout | undefined;
    private intervalRender: NodeJS.Timeout | undefined;
    private current: any[];
    private currentX: number;
    private currentY: number;
    private isFreezed: boolean;
    private readonly shapes: [number[], number[], number[], number[], number[], number[], number[]];
    private colors: string[];

    constructor() {
        this.board = [];
        this.lose = false;
        this.interval = undefined;
        this.intervalRender = undefined;
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

    tick() {
        if ( this.validate( 0, 1 ) ) {
            ++this.currentY;
        } else {
            this.freeze();
            this.validate(0, 1);
            this.clearFilledLines();
            if (this.lose) {
                this.clearAllIntervals();
                return false;
            }
            this.newShape();
        }
    }

    freeze(): void {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.current[y][x]) {
                    this.board[y + this.currentY][x + this.currentX] = this.current[y][x];
                }
            }
        }
        this.isFreezed = true;
    }

    clearFilledLines(): void {
        for ( let y = ROWS - 1; y >= 0; --y ) {
            let rowFilled = true;
            for ( let x = 0; x < COLS; ++x ) {
                if ( this.board[ y ][ x ] == 0 ) {
                    rowFilled = false;
                    break;
                }
            }
            if ( rowFilled ) {
                // document.getElementById( 'clearsound' ).play();
                for ( let yy = y; yy > 0; --yy ) {
                    for ( let x = 0; x < COLS; ++x ) {
                        this.board[ yy ][ x ] = this.board[ yy - 1 ][ x ];
                    }
                }
                ++y;
            }
        }
    }

    validate( offsetX = 0, offsetY = 0, newCurrent = this.current ): boolean {
        const newOffsetX = this.currentX + offsetX;
        const newOffsetY = this.currentY + offsetY;

        for ( let y = 0; y < 4; ++y ) {
            for ( let x = 0; x < 4; ++x ) {
                if ( newCurrent[ y ][ x ] ) {
                    if ( typeof this.board[ y + newOffsetY ] === 'undefined'
                        || typeof this.board[ y + newOffsetY ][ x + newOffsetX ] === 'undefined'
                        || this.board[ y + newOffsetY ][ x + newOffsetX ]
                        || x + newOffsetX < 0
                        || y + newOffsetY >= ROWS
                        || x + newOffsetX >= COLS ) {
                        if (newOffsetY === 1 && this.isFreezed) {
                            this.lose = true;
                            // document.getElementById('start-btn').disabled = false;
                        }
                        return false;
                    }
                }
            }
        }
        return true;
    }

    keyPress( key: string ) {
        switch ( key ) {
            case 'left':
                if ( this.validate( -1 ) ) {
                    --this.currentX;
                }
                break;
            case 'right':
                if ( this.validate( 1 ) ) {
                    ++this.currentX;
                }
                break;
            case 'down':
                if ( this.validate( 0, 1 ) ) {
                    ++this.currentY;
                }
                break;
            case 'rotate':
                let rotated = this.rotate();
                if ( this.validate( 0, 0, rotated ) ) {
                    this.current = rotated;
                }
                break;
            case 'drop':
                while( this.validate(0, 1) ) {
                    ++this.currentY;
                }
                this.tick();
                break;
        }
    }

    start(): void {
        for ( let y = 0; y < ROWS; ++y ) {
            this.board[ y ] = [];
            for ( let x = 0; x < COLS; ++x ) {
                this.board[ y ][ x ] = 0;
            }
        }
    }

    playButtonClicked() {
        this.newGame();
        // document.getElementById("start-btn").disabled = true;
    }

    newGame() {
        this.clearAllIntervals();
        this.intervalRender = setInterval( render, 30 );
        this.clearBoard();
        this.newShape();
        this.lose = false;
        this.interval = setInterval( this.tick, 400 );
    }

    clearAllIntervals(){
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.intervalRender) {
            clearInterval(this.intervalRender);
        }
    }
}

export { Tetris }