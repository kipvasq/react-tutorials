import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// individual square (no state)
function Square(props){
    return(
        <button className="square" onClick={props.onClick} style={{background: props.background}}>
            {props.value}
        </button>
    );
}

// group of squares (since no state stored, we can write a class without constructor)
class Board extends React.Component {    
    renderSquare(i){
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
                background={this.props.background[i]}
            />
        ); // communication between components, through properties (value, onClick, background)
    }

    render(){
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
        super(props); // always necessary
        this.state = {
            history: [{
                squares: Array(9).fill(null), // board state
            }],
            stepNumber: 0,  // current move number
            xIsNext: true,  // determines whose turn it is
        }
    }

    handleClick(i){
        // update history and create new copy of squares, immutable data structure
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // determine if a winner has won
        if(calculateWinner(squares) || squares[i]) {
            return; // game already over, or invalid move
        }

        // update board
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        // enforce state
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step){
        // enforce state
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render(){
        // get history
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        
        // calculate board details
        var winDetails = calculateWinner(current.squares);
        var win_row = [];
        var winner = undefined;
        var colored_row = Array(9).fill("none");

        if(winDetails){
            winner = winDetails[0];
            win_row = winDetails[1];
            for(let i = 0; i < win_row.length; i++){
                colored_row[win_row[i]] = "green";
            }
        }

        // map button(s) to previous states
        const moves = history.map((step, move) => {
            const desc = move ? 'Go To Move #' + move : 'Go To Game Start';
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        // determine game status
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    background={colored_row}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{moves}</div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return [squares[a], [a, b, c]];
        }
    }
    return null;
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);