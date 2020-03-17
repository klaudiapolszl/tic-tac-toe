import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";

        this.setState({
            history: history.concat([{
                squares: squares,
                currentLocation: getLocation(i)
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const currentLocation = step.currentLocation ? step.currentLocation : " ";
            const desc = move ? 'Go to move #' + move : 'Go to the beginning of the game';
            return (
                <li key={ move }>
                    <button  className={ move === this.state.stepNumber ? "history-btn history-btn--selected" : "history-btn"} onClick={ () => this.jumpTo(move) }>
                        { desc } { currentLocation }
                    </button>
                </li>
            );
        })

        let status;
        if (winner) {
            status = 'The winner is ' + winner;
        } else if (history.length === 10) {
            status = 'No one won';
        } else {
            status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return(
            <div className="main-container">
                <div className="main-container-title">Tic Tac Toe Game</div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={ current.squares }
                            onClick = { (i) => this.handleClick(i) }
                        />
                    </div>
                    <div className="game-info">
                        <div className="game-info-status">{ status }</div>
                        <ol className="game-info-moves">{ moves }</ol>
                    </div>
                </div>
            </div>
        );
    }
}

const calculateWinner = (squares) => {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    for (let i=0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if (squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
};

const getLocation = (move) => {
    const locationMap = {
        0: ' (location: row: 1, col: 1)',
        1: ' (location: row: 1, col: 2)',
        2: ' (location: row: 1, col: 3)',
        3: ' (location: row: 2, col: 1)',
        4: ' (location: row: 2, col: 2)',
        5: ' (location: row: 2, col: 3)',
        6: ' (location: row: 3, col: 1)',
        7: ' (location: row: 3, col: 2)',
        8: ' (location: row: 3, col: 3)',
    };

    return locationMap[move];
};

export default Game;
