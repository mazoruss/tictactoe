var util = require('util');

var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var player = 1;
var counter = 0;

process.stdin.resume();
process.stdin.setEncoding('utf8');

var printBoard = (board) => {
	console.log('    A   B   C  ');
	console.log('  -------------');
	for (var i = 0; i < 3; i++) {
		var line = '|';
		for (var j = 0; j < 3; j++) {
			line += keyMap[board[i][j]] + '|'

		}
		console.log((i + 1) + ' ' + line);
		console.log('  -------------');
	}
};

var changePlayer = () => {
	player = (player % 2) + 1;
};

var toggleBoard = (row, col) => {
	row = Number(row) - 1;
	col = colMap[col];

	if (board[row] && board[row][col] === 0) {
		board[row][col] = player;
		return true;
	}

	return false;
};

var checkWinner = () => {
	var winningComp = [
		[[0, 0], [0, 1], [0, 2]],
		[[1, 0], [1, 1], [1, 2]],
		[[2, 0], [2, 1], [2, 2]],
		[[0, 0], [1, 0], [2, 0]],
		[[0, 1], [1, 1], [2, 1]],
		[[0, 2], [1, 2], [2, 2]],
		[[0, 0], [1, 1], [2, 2]],
		[[0, 2], [1, 1], [2, 0]],
	];

	var hasWinner = false;
	winningComp.forEach(triples => {
		var result = true;
		triples.forEach(pair => {
			var x = pair[0];
			var y = pair[1];
			result = result && (board[x][y] === player);
		})
		hasWinner = result || hasWinner;
	})

	return hasWinner;
}


process.stdin.on('data', function (text) {
  if (text === 'quit\n') {
    done();
  }
  var input = text.split('');
  var moved = toggleBoard(input[0], input[1]);

  if (moved) {
  	counter++;
  	if (checkWinner()) {
	  	printBoard(board);
  		console.log('WINNER: Player ' + player);
  		done();
  	} else {
  		if (counter === 9) {
  			console.log('DRAW');
  			done();
  		}
	  	changePlayer();
	  	console.log('Next Move Player ' + player);
	  	printBoard(board);
  	}
  } else {
  	console.log('Invalid Move');
  }

  
});

function done() {
  process.exit();
}

var keyMap = {
	0: '   ',
	1: ' X ',
	2: ' O ',
}

var colMap = {
	A: 0,
	B: 1,
	C: 2,
}

var printEmptyBoard = (board) => {
	console.log('    A   B   C  ');
	console.log('  -------------');
	for (var i = 0; i < 3; i++) {
		var line = '|';
		for (var j = 0; j < 3; j++) {
			line += '   ' + '|'

		}
		console.log((i + 1) + ' ' + line);
		console.log('  -------------');
	}
};

printEmptyBoard();
console.log('player 1 start (example inputs: "1A", "2B", etc)');