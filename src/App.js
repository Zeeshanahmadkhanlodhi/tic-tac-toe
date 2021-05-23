import './App.css';

import React, { Component, useState } from 'react'


function Square(props) {
  const [color,setcolor] = useState(true);

  
  return (
  
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


 class Board extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        square:Array(9).fill(null),
        xIsNext:true,
  
     }
   }
  


   handleClick(i){
     const squares = this.state.square.slice();
     if(calculateWinnder(squares) || squares[i]){
       return;
     }
     squares[i] = this.state.xIsNext ? 'X':'O';
     this.setState({
       square:squares,
       xIsNext:!this.state.xIsNext, 

      });
   }
   
  renderSquare(i) {
    return <Square 
    value ={this.state.square[i]}
    onClick = {()=> this.handleClick(i)}
    />
  }

  
  render(){
    const winner = calculateWinnder(this.state.square);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }else{
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');

    }

    
  


    return(
      <div className="board">
        <div className="status" >{status}</div>
        <div className="boardrow">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="boardrow">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="boardrow">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}



export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       history:[{
        Sqaure:Array(9).fill(null),
       }],
       xIsNext:true,
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="game-board">
          <Board />

        </div>
      </div>
    )
  }
}

export default App


function calculateWinnder(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,3,6],
    [0,4,8],
    [2,4,6],

  ];

  for(let i=0; i < lines.length;i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null
}