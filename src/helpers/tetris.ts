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

// keep the element moving down, creating new shapes and clearing lines
    function tick() {
        if ( valid( 0, 1 ) ) {
            ++currentY;
        }
        // if the element settled
        else {
            freeze();
            valid(0, 1);
            clearLines();
            if (lose) {
                clearAllIntervals();
                return false;
            }
            newShape();
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

    // here
    clearfilledLines(): void {
        for ( var y = ROWS - 1; y >= 0; --y ) {
            var rowFilled = true;
            for ( var x = 0; x < COLS; ++x ) {
                if ( board[ y ][ x ] == 0 ) {
                    rowFilled = false;
                    break;
                }
            }
            if ( rowFilled ) {
                document.getElementById( 'clearsound' ).play();
                for ( var yy = y; yy > 0; --yy ) {
                    for ( var x = 0; x < COLS; ++x ) {
                        board[ yy ][ x ] = board[ yy - 1 ][ x ];
                    }
                }
                ++y;
            }
        }
    }

    // checks if the resulting position of current shape will be feasible
    function valid( offsetX, offsetY, newCurrent ) {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        offsetX = currentX + offsetX;
        offsetY = currentY + offsetY;
        newCurrent = newCurrent || current;

        for ( var y = 0; y < 4; ++y ) {
            for ( var x = 0; x < 4; ++x ) {
                if ( newCurrent[ y ][ x ] ) {
                    if ( typeof board[ y + offsetY ] == 'undefined'
                        || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
                        || board[ y + offsetY ][ x + offsetX ]
                        || x + offsetX < 0
                        || y + offsetY >= ROWS
                        || x + offsetX >= COLS ) {
                        if (offsetY == 1 && freezed) {
                            lose = true; // lose if the current shape is settled at the top most row
                            document.getElementById('playbutton').disabled = false;
                        }
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function keyPress( key ) {
        switch ( key ) {
            case 'left':
                if ( valid( -1 ) ) {
                    --currentX;
                }
                break;
            case 'right':
                if ( valid( 1 ) ) {
                    ++currentX;
                }
                break;
            case 'down':
                if ( valid( 0, 1 ) ) {
                    ++currentY;
                }
                break;
            case 'rotate':
                var rotated = rotate( current );
                if ( valid( 0, 0, rotated ) ) {
                    current = rotated;
                }
                break;
            case 'drop':
                while( valid(0, 1) ) {
                    ++currentY;
                }
                tick();
                break;
        }
    }

    start(): void {
        this.newShape();
    }

    // function playButtonClicked() {
    //     newGame();
    //     document.getElementById("playbutton").disabled = true;
    // }
    //
    // function newGame() {
    //     clearAllIntervals();
    //     intervalRender = setInterval( render, 30 );
    //     init();
    //     newShape();
    //     lose = false;
    //     interval = setInterval( tick, 400 );
    // }
    //
    // function clearAllIntervals(){
    //     clearInterval( interval );
    //     clearInterval( intervalRender );
    // }


}

export { Tetris }