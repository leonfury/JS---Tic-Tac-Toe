//TIC TAC TOE
//declarations
	const gameBoard = document.getElementById('gameBoard'); 
	const scoreBoard = document.getElementById('scoreBoard');
	const initialization = document.getElementById('initialization');
	const startGameBtn = document.getElementById('startGame');
	const newGameBtn = document.getElementById('newGame');
	const anotherGameBtn = document.getElementById('anotherGame');
	const player1Turn = document.getElementById('player1Turn');
	const player2Turn = document.getElementById('player2Turn');
	const roundEnd = document.getElementById('roundEnd');
	const player1Lead = document.getElementById('player1Lead');
	const player2Lead = document.getElementById('player2Lead');
	const gameTie = document.getElementById('gameTie');
	const playAgainst = document.getElementById('playAgainst');
	const chooseOpponent = document.getElementById('chooseOpponent');
	const playWithPlayer = document.getElementById('playWithPlayer');
	const playWithAI = document.getElementById('playWithAI');

	let boardStatus = [];
	let player1Status = [];
	let player2Status = [];
	let round = 1; //for alternating player inputs
	let gameState = true; //ongoing game; false = pause state game
	let player1Score = 0;
	let player2Score = 0;
	let tieScore = 0;
	let activeAI = false;

//1. drawing tic tac toe board
	// using HTML

//1a. player set board sizing (anytime)
	function smallBoard () {
		gameBoard.style.height = "200px";
		gameBoard.style.width = "200px";
	}

	function normalBoard () {	
		gameBoard.style.height = "300px";
		gameBoard.style.width = "300px";
	}	

	function bigBoard () {
		gameBoard.style.height = "400px";
		gameBoard.style.width = "400px";		
	}

//1b. play with AI or player -> using even/odd numbers to determine
	function playPlayer () {
		startGameBtn.classList.remove('hide');
		playWithPlayer.classList.add('hide');
		playWithAI.classList.add('hide');
		playAgainst.innerHTML = "Playing Against <em>Human Player</em>";
	}

	function playAI () {
		startGameBtn.classList.remove('hide');
		playWithPlayer.classList.add('hide');
		playWithAI.classList.add('hide');
		playAgainst.innerHTML = "Playing Against <em>AI</em>";
		activeAI = true;
	}

function executePlayerAI () {
	if (!gameState) return null;

	//check if center cell filled, otherwise fill
		if (boardStatus[4] != "X") {
			return ( player2Input(4) );
		}

	//going for the winning move********************-------------------------------------------------------------------------
		//check for horizontal
		for (let i = 0; i <= 9; i=i+3) { //loop is 0,3,6,9
			if ( player2Status[i] && boardStatus[i+1] != "X" && player2Status [i+2] ) return ( player2Input(i+1) );
			if ( boardStatus[i] != "X" && player2Status[i+1] && player2Status [i+2] ) return ( player2Input(i) );
			if ( player2Status[i] && player2Status [i+1] && boardStatus[i+2] != "X" ) return ( player2Input(i+2) );
		}

		//check for vertical
		for (let i = 0; i < 3; i++) { //loop is 0,3,6,9
			if ( player2Status[i] && boardStatus[i+3] != "X" && player2Status [i+6] ) return ( player2Input(i+3) );
			if ( boardStatus[i] != "X" && player2Status[i+3] && player2Status [i+6] ) return ( player2Input(i) );
			if ( player2Status[i] && player2Status [i+3] && boardStatus[i+6] != "X" ) return ( player2Input(i+6) );
		}

		// check for diag 0 4 8
			if ( player2Status[0] && boardStatus[4] != "X" && player2Status [8] ) return ( player2Input(4) );
			if ( boardStatus[0] != "X" && player2Status[4] && player2Status [8] ) return ( player2Input(0) );
			if ( player2Status[0] && player2Status[4] && boardStatus[8] != "X" ) return ( player2Input(8) );

		// check for diag 2 4 6
			if ( player2Status[2] && boardStatus[4] != "X" && player2Status [6] ) return ( player2Input(4) );
			if ( boardStatus[2] != "X" && player2Status[4] && player2Status [6] ) return ( player2Input(2) );
			if ( player2Status[2] && player2Status[4] && boardStatus[6] != "X" ) return ( player2Input(6) );

	//block opponent from winning********************--------------------------------------------------------------------------------------
		//check for horizontal
		for (let i = 0; i <= 9; i=i+3) { //loop is 0,3,6,9
			if ( player1Status[i] && boardStatus[i+1] != "X" && player1Status [i+2] ) return ( player2Input(i+1) );
			if ( boardStatus[i] != "X" && player1Status[i+1] && player1Status [i+2] ) return ( player2Input(i) );
			if ( player1Status[i] && player1Status[i+1] && boardStatus[i+2] != "X" ) return ( player2Input(i+2) );
		}

		//check for vertical
		for (let i = 0; i < 3; i++) { //loop is 0,3,6,9
			if ( player1Status[i] && boardStatus[i+3] != "X" && player1Status [i+6] ) return ( player2Input(i+3) );
			if ( boardStatus[i] != "X" && player1Status[i+3] && player1Status [i+6] ) return ( player2Input(i) );
			if ( player1Status[i] && player1Status[i+3] && boardStatus[i+6] != "X" ) return ( player2Input(i+6) );
		}

		// check for diag 0 4 8
			if ( player1Status[0] && boardStatus[4] != "X" && player1Status[8] ) return ( player2Input(4) );
			if ( boardStatus[0] != "X" && player1Status[4] && player1Status[8] ) return ( player2Input(0) );
			if ( player1Status[0] && player1Status[4] && boardStatus[8] != "X" ) return ( player2Input(8) );

		// check for diag 2 4 6
			if ( player1Status[2] && boardStatus[4] != "X" && player1Status[6] ) return ( player2Input(4) );
			if ( boardStatus[2] != "X" && player1Status[4] && player1Status[6] ) return ( player2Input(2) );
			if ( player1Status[2] && player1Status[4] && boardStatus[6] != "X" ) return ( player2Input(6) );
	
	//block opponent from winning via bottom invert L move
		if (boardStatus[8] != "X" && player1Status[5] && player1Status[7]) return ( player2Input(8) );

	//block opponent from winning via diag moves
		if ( boardStatus[1] != "X" && player1Status[0] && player1Status[8] 
			||  boardStatus[1] != "X" && player1Status[2]  && player1Status[6] 
			|| boardStatus[1] != "X" && player1Status[0] && player1Status[5] 
			||  boardStatus[1] != "X" && player1Status[5] && player1Status[6]) return ( player2Input(1) );

	//block opponent from winning via cell 2,7
		if ( boardStatus[1] != "X" && player1Status[2] && player1Status[7] && boardStatus[8] != "X" ) return ( player2Input(8) );

	//block opponent from winning via bottom tirangle move 0
		if ( boardStatus[0] != "X" )  return ( player2Input(0) );

	//block opponent from winning via tirangle move 2
		if ( boardStatus[6] != "X" )  return ( player2Input(6) );

	//block opponent from winning via bottom tirangle move 1
		if ( boardStatus[2] != "X" )  return ( player2Input(2) );
			
	//random move
		let randomMove;
		//getting valid random move
		//infinite loop
		do {
			randomMove = Math.floor ( Math.random() * 9 );
		} while (boardStatus[randomMove] == "X" && gameState);

		return ( player2Input(randomMove) );
	}

//player inputs
	function player1Input (i) {
		gameBoard.children[i].classList.add('player1');
		player1Status[i] = 1;
		boardStatus[i] = "X"; 
	}

	function player2Input (i) {
		gameBoard.children[i].classList.add('player2');
		player2Status[i] = 1;
		boardStatus[i] = "X"; 
		return null;
	}

//1c. start game
	function startGame () {
		gameBoard.classList.remove('hide');
		startGameBtn.classList.add('hide');
		newGameBtn.classList.remove('hide');
		anotherGameBtn.classList.remove('hide');
		gameState = true;
		displayTurnScreen();
	}

	function displayTurnScreen () {	
		if (gameState == false) {
			player1Turn.classList.add('hide');
			player2Turn.classList.add('hide');
			roundEnd.classList.remove('hide');
			return;
		}

		if (round % 2 == 1) {
			player1Turn.classList.remove('hide');
			player2Turn.classList.add('hide');
			roundEnd.classList.add('hide');
		}

		if (round % 2 == 0) {
			player1Turn.classList.add('hide');
			player2Turn.classList.remove('hide');
			roundEnd.classList.add('hide');
		}
	}

//2. track user input on board
	for (let i = 0; i < gameBoard.children.length; i++) {
		gameBoard.children[i].onclick = function (event) {
			console.log('round ' + round);
			if (gameState) {
				//check board status!
				if (boardStatus[i]) {
					window.alert('That cell is occupied! Choose another cell');
					return;
				}
				//check player turn then update player status
				if (round % 2 == 1) player1Input(i);

				if (round % 2 == 0 && !activeAI) player2Input(i);
				round++; //round increment

				//check for win condition
				setTimeout (checkWin, 10);
				//check for tie condition
				setTimeout (checkDraw, 10);
				setTimeout(displayTurnScreen, 15);

				if (activeAI && gameState) {
					setTimeout (executePlayerAI, 50);
					setTimeout (checkAIWin, 70);
				}
			}
			else {
				window.alert('Game has ended');
			}
		}
	}

	function checkWin () {
		//player 1&2 horizontal wins
		for (let i = 0; i < boardStatus.length; i=i+3) { 
			if ( player1Status[i] && player1Status[i+1] && player1Status[i+2] ) player1Win (); 
			if ( player2Status[i] && player2Status[i+1] && player2Status[i+2] ) player2Win (); 
		}
		//player 1&2 vertical  wins
		for (let i = 0; i < boardStatus.length; i++) { 
			if ( player1Status[i] && player1Status[i+3] && player1Status[i+6] ) player1Win (); 
			if ( player2Status[i] && player2Status[i+3] && player2Status[i+6] ) player2Win ();
		}
		//player 1&2 diagonal win
			( player1Status[0] && player1Status[4] && player1Status[8] ) ?  player1Win () : 
			( player1Status[2] && player1Status[4] && player1Status[6] ) ?  player1Win () : 
			( player2Status[0] && player2Status[4] && player2Status[8] ) ?  player2Win () : 
			( player2Status[2] && player2Status[4] && player2Status[6] ) ?  player2Win () : null;
	}
	
	function player1Win () {
		window.alert("Player 1 Wins");
		gameState = false;
		player1Score++;
		updateScore();
		console.log('game end');
	}

	function player2Win () {
		window.alert("Player 2 Wins");
		gameState = false;
		player2Score++;
		updateScore();
		console.log('game end');
	}

	function checkAIWin() {
		round++;
		checkWin();
		checkDraw();
		displayTurnScreen();
	}

	function checkDraw () {
		if (!gameState) return null;

		if (boardStatus.length == 9) {
			//if board status. length is 9 then check whether fully filled
			for (let i = 0; i < 9; i++) {
				//if fully filled with X then draw game
				//otherwise continue game
				if(boardStatus[i] == "X") {
				}
				else {
					return;
				}
			}
			tieScore++;
			window.alert('Tie Game!!');
			gameState = false;
			updateScore();
			console.log('game end');
		}
	}

//3. alternate user input
//4. check win/lose/tie condition

//5. keeping scores
	function updateScore() {
		if (player1Score > player2Score) {
			player1Lead.classList.remove('hide');
			player2Lead.classList.add('hide');
			gameTie.classList.add('hide');
		}

		if (player1Score < player2Score) {
			player1Lead.classList.add('hide');
			player2Lead.classList.remove('hide');
			gameTie.classList.add('hide');
		}

		if (player1Score == player2Score) {
			player1Lead.classList.add('hide');
			player2Lead.classList.add('hide');
			gameTie.classList.remove('hide');
		}

		scoreBoard.innerHTML = "";
		scoreBoard.innerHTML = `Player 1 score: ${player1Score} <br/> Player 2 score: ${player2Score} <br/> Ties: ${tieScore}`;
	}

//6. restart game with scores in tact
	function anotherRound () {
		round = 1;
		//clear boardStatus
		boardStatus = [];
		gameState = true;
		player1Status=[];
		player2Status=[];
		//clear all player inputs
		for (let i = 0; i < gameBoard.children.length; i++) {
			gameBoard.children[i].classList.remove('player1');
			gameBoard.children[i].classList.remove('player2');
		}
		displayTurnScreen();
	}

//7. reset game
	function newGame () {
		anotherRound();
		gameState = false;
		scoreBoard.innerHTML ="";
		player1Score = 0;
		player2Score = 0;
		tieScore = 0;
		activeAI = false;
		gameBoard.classList.add('hide');
		startGameBtn.classList.add('hide');
		newGameBtn.classList.add('hide');
		anotherGameBtn.classList.add('hide');
		playAgainst.innerHTML = "Play Against : ";
		playWithPlayer.classList.remove('hide');
		playWithAI.classList.remove('hide');
		player1Lead.classList.add('hide');
		player2Lead.classList.add('hide');
		gameTie.classList.add('hide');
		displayTurnScreen();
		roundEnd.classList.add('hide');
	}

	
	
	
	