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
	//check if center cell filled, otherwise fill
	if (boardStatus[4] != "X") {
		gameBoard.children[4].classList.add('player2');
		player2Status[4] = 2;
		boardStatus[4] = "X";
		return null;
	}
	//if center cell filled, then fill first cell
	if (boardStatus[4] == "X" && boardStatus[0] != "X") {
		gameBoard.children[0].classList.add('player2');
		player2Status[0] = 2;
		boardStatus[0] = "X";
		return null;
	}

//going for the winning move********************-------------------------------------------------------------------------
	//check for horizontal
	for (let i = 0; i <= 9; i=i+3) { //loop is 0,3,6,9
		//check for missing center
		if ( player2Status[i] == 2 && boardStatus[i+1] != "X" && player2Status [i+2] == 2 ) {
			gameBoard.children[i+1].classList.add('player2');
			player2Status[i+1] = 2;
			boardStatus[i+1] = "X";
			return null;
		}

		//missing left
		if ( boardStatus[i] != "X" && player2Status[i+1] == 2 && player2Status [i+2] == 2 ) {
			gameBoard.children[i].classList.add('player2');
			player2Status[i] = 2;
			boardStatus[i] = "X";
			return null;
		}

		//missing right
		if ( player2Status[i] == 2 && player2Status [i+1] == 2 && boardStatus[i+2] != "X" ) {
			gameBoard.children[i+2].classList.add('player2');
			player2Status[i+2] = 2;
			boardStatus[i+2] = "X";
			return null;
		}
	}
	//check for vertical
	for (let i = 0; i < 3; i++) { //loop is 0,3,6,9
		//check for missing center
		if ( player2Status[i] == 2 && boardStatus[i+3] != "X" && player2Status [i+6] == 2 ) {
			gameBoard.children[i+3].classList.add('player2');
			player2Status[i+3] = 2;
			boardStatus[i+3] = "X";
			return null;
		}

		//missing top
		if ( boardStatus[i] != "X" && player2Status[i+3] == 2 && player2Status [i+6] == 2 ) {
			gameBoard.children[i].classList.add('player2');
			player2Status[i] = 2;
			boardStatus[i] = "X";
			return null;
		}

		//missing bottom
		if ( player2Status[i] == 2 && player2Status [i+3] == 2 && boardStatus[i+6] != "X" ) {
			gameBoard.children[i+6].classList.add('player2');
			player2Status[i+6] = 2;
			boardStatus[i+6] = "X";
			return null;
		}
	}

	// check for diag 0 4 8
		if ( player2Status[0] == 2 && boardStatus[4] != "X" && player2Status [8] == 2 ) {
			gameBoard.children[4].classList.add('player2');
			player2Status[4] = 2;
			boardStatus[4] = "X";
			return null;
		}
		//missing top
		if ( boardStatus[0] != "X" && player2Status[4] == 2 && player2Status [8] == 2 ) {
			gameBoard.children[0].classList.add('player2');
			player2Status[0] = 2;
			boardStatus[0] = "X";
			return null;
		}
		//missing bottom
		if ( player2Status[0] == 2 && player2Status [4] == 2 && boardStatus[8] != "X" ) {
			gameBoard.children[8].classList.add('player2');
			player2Status[8] = 2;
			boardStatus[8] = "X";
			return null;
		}

	// check for diag 2 4 6
		if ( player2Status[2] == 2 && boardStatus[4] != "X" && player2Status [6] == 2 ) {
			gameBoard.children[4].classList.add('player2');
			player2Status[4] = 2;
			boardStatus[4] = "X";
			return null;
		}
		//missing top
		if ( boardStatus[2] != "X" && player2Status[4] == 2 && player2Status [6] == 2 ) {
			gameBoard.children[2].classList.add('player2');
			player2Status[2] = 2;
			boardStatus[2] = "X";
			return null;
		}
		//missing bottom
		if ( player2Status[2] == 2 && player2Status [4] == 2 && boardStatus[6] != "X" ) {
			gameBoard.children[6].classList.add('player2');
			player2Status[6] = 2;
			boardStatus[6] = "X";
			return null;
		}

//block opponent from winning********************--------------------------------------------------------------------------------------
	//check for horizontal
	for (let i = 0; i <= 9; i=i+3) { //loop is 0,3,6,9
		//check for missing center
		if ( player1Status[i] == 1 && boardStatus[i+1] != "X" && player1Status [i+2] == 1 ) {
			gameBoard.children[i+1].classList.add('player2');
			player2Status[i+1] = 2;
			boardStatus[i+1] = "X";
			return null;
		}

		//missing left
		if ( boardStatus[i] != "X" && player1Status[i+1] == 1 && player1Status [i+2] == 1 ) {
			gameBoard.children[i].classList.add('player2');
			player2Status[i] = 2;
			boardStatus[i] = "X";
			return null;
		}

		//missing right
		if ( player1Status[i] == 1 && player1Status [i+1] == 1 && boardStatus[i+2] != "X" ) {
			gameBoard.children[i+2].classList.add('player2');
			player2Status[i+2] = 2;
			boardStatus[i+2] = "X";
			return null;
		}
	}
	//check for vertical
	for (let i = 0; i < 3; i++) { //loop is 0,3,6,9
		//check for missing center
		if ( player1Status[i] == 1 && boardStatus[i+3] != "X" && player1Status [i+6] == 1 ) {
			gameBoard.children[i+3].classList.add('player2');
			player2Status[i+3] = 2;
			boardStatus[i+3] = "X";
			return null;
		}

		//missing top
		if ( boardStatus[i] != "X" && player1Status[i+3] == 1 && player1Status [i+6] == 1 ) {
			gameBoard.children[i].classList.add('player2');
			player2Status[i] = 2;
			boardStatus[i] = "X";
			return null;
		}

		//missing bottom
		if ( player1Status[i] == 1 && player1Status [i+3] == 1 && boardStatus[i+6] != "X" ) {
			gameBoard.children[i+6].classList.add('player2');
			player2Status[i+6] = 2;
			boardStatus[i+6] = "X";
			return null;
		}
	}

	// check for diag 0 4 8
		if ( player1Status[0] == 1 && boardStatus[4] != "X" && player1Status [8] == 1 ) {
			gameBoard.children[4].classList.add('player2');
			player2Status[4] = 2;
			boardStatus[4] = "X";
			return null;
		}
		//missing top
		if ( boardStatus[0] != "X" && player1Status[4] == 1 && player1Status [8] == 1 ) {
			gameBoard.children[0].classList.add('player2');
			player2Status[0] = 2;
			boardStatus[0] = "X";
			return null;
		}
		//missing bottom
		if ( player1Status[0] == 1 && player1Status [4] == 1 && boardStatus[8] != "X" ) {
			gameBoard.children[8].classList.add('player2');
			player2Status[8] = 2;
			boardStatus[8] = "X";
			return null;
		}

	// check for diag 2 4 6
		if ( player1Status[2] == 1 && boardStatus[4] != "X" && player1Status [6] == 1 ) {
			gameBoard.children[4].classList.add('player2');
			player2Status[4] = 2;
			boardStatus[4] = "X";
			return null;
		}
		//missing top
		if ( boardStatus[2] != "X" && player1Status[4] == 1 && player1Status [6] == 1 ) {
			gameBoard.children[2].classList.add('player2');
			player2Status[2] = 2;
			boardStatus[2] = "X";
			return null;
		}
		//missing bottom
		if ( player1Status[2] == 1 && player1Status [4] == 1 && boardStatus[6] != "X" ) {
			gameBoard.children[6].classList.add('player2');
			player2Status[6] = 2;
			boardStatus[6] = "X";
			return null;
		}
		
	//random move
		let randomMove;
		//getting valid random move
		//infinite loop
		do {
			randomMove = Math.floor ( Math.random() * 9 );
		} while (boardStatus[randomMove] == "X" && gameState == true);

		gameBoard.children[randomMove].classList.add('player2');
		player2Status[randomMove] = 2;
		boardStatus[randomMove] = "X";
		
		console.log('AI execution end');
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
			if (gameState == true) {
				//check board status!
				if (boardStatus[i] == "X") {
					window.alert('That cell is occupied! Choose another cell');
					return;
				}
				//check player turn then update player status
				if (round % 2 == 1) {
					gameBoard.children[i].classList.add('player1');
					player1Status[i] = 1;
				}

				if (round % 2 == 0) {
					gameBoard.children[i].classList.add('player2');
					player2Status[i] = 2;
				}
				//update board status
				boardStatus[i] = "X"; 
				round++; //round increment

				//check for win condition
				checkWin();
				//check for tie condition
				checkDraw();
				displayTurnScreen();

				if (activeAI == true && gameState == true) {
					setTimeout (executePlayerAI, 50);
					setTimeout (checkAIWin, 70);
				}
			}
			else {
				window.alert('Game has ended');
			}
			console.log(`player 1 ` + player1Status);
			console.log(`player 2 ` + player2Status);
		}
	}

	function checkWin () {
		//horizontal wins
			(player1Status[0] == 1) && (player1Status[1] == 1) && (player1Status[2] == 1) ?  player1Win () : 
			(player1Status[3] == 1) && (player1Status[4] == 1) && (player1Status[5] == 1) ?  player1Win () : 
			(player1Status[6] == 1) && (player1Status[7] == 1) && (player1Status[8] == 1) ?  player1Win () : 
			(player1Status[0] == 1) && (player1Status[4] == 1) && (player1Status[8] == 1) ?  player1Win () : 
			(player1Status[2] == 1) && (player1Status[4] == 1) && (player1Status[6] == 1) ?  player1Win () :null;

		//vertical and diag wins
		for (let i = 0; i < player1Status.length; i++) { 
			(player1Status[i] == 1) && (player1Status[i+3] == 1) && (player1Status[i+6] == 1) ?  player1Win () : null; 
		}

			(player2Status[0] == 2) && (player2Status[1] == 2) && (player2Status[2] == 2) ?  player2Win () : 
			(player2Status[3] == 2) && (player2Status[4] == 2) && (player2Status[5] == 2) ?  player2Win () : 
			(player2Status[6] == 2) && (player2Status[7] == 2) && (player2Status[8] == 2) ?  player2Win () : 
			(player2Status[0] == 2) && (player2Status[4] == 2) && (player2Status[8] == 2) ?  player2Win () : 
			(player2Status[2] == 2) && (player2Status[4] == 2) && (player2Status[6] == 2) ?  player2Win () : null;

		for (let i = 0; i < player2Status.length; i++) { 
			
			(player2Status[i] == 2) && (player2Status[i+3] == 2) && (player2Status[i+6] == 2) ?  player2Win () : null;
		}
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
		if (gameState == false) return null;

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

	
	
	
	