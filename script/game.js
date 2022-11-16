const Difficulty = {
    Easy: 0,
    Medium: 1,
    Hard: 2
}

const players = ["Player 1", "AI", "Player 2"];

var game = {
    opponent: 1, /* 1=ai, 2=jogador 2*/
    firstPlayer: 0, /* 0=P1, 1=ai/P2*/
    difficulty: Difficulty.Easy,
    turn: 0, /* 0 ou 1 */
    board: [],
    ncols: 4,
    currentPlayer: 0, //players[] index

    init: function(ncols,difficulty,opponent,first){
        game.board = new Array(ncols);
        this.opponent = opponent
        this.firstPlayer = first
        this.difficulty = difficulty
        this.ncols = ncols
        
        if(this.firstPlayer==0) this.currentPlayer = 0;
        else this.currentPlayer = this.opponent;

        updateCurrentPlayer() //show current player

        //If AI plays first
        if(this.currentPlayer==1){
            toggleDiv("thinking");
            setTimeout(() => this.aiplay(),1000);
        }
    },

    switchTurn: function(){
        //troca turn entre 0 e 1
        this.turn = (this.turn==0 ? 1 : 0);
        this.currentPlayer = (this.currentPlayer==0 ? this.opponent : 0)//if current=p1, switch to opponent
    },

    isEmpty: function(){
        //true se todas colunas vazias
        for(let i=0; i<this.ncols;i++)
            if(this.board[i]>0) return false;
        return true;
    },

    checkWinner: function(){        
        if(this.isEmpty()){
            alert(players[this.currentPlayer] + " wins!");
            return players[this.currentPlayer];    
        }
        return false;
    },

    play: function(col,row){
        //(row: 0 = remove from top to bottom, row: 1 = remove from top to row 1,....)
        let c = parseInt(col[1]);

        removePieces(col,row);
        game.board[c] -= this.board[c]-row;
        //console.log(players[this.currentPlayer] + " removes from column " + c + " npieces " + r);
        if(!this.checkWinner()){
            this.switchTurn();
            updateCurrentPlayer()
            if(this.currentPlayer==1){
                toggleDiv("thinking");
                setTimeout(() => this.aiplay(),1000);
            }
        }
    },

    randomPlay: function(){
        let col = this.generateRandomPlay(); //"c<x>"
        let c = col[1]
        let npieces = game.board[c];
        npieces = Math.floor(Math.random()*npieces);
        this.play(col,npieces)
    },

    generateRandomPlay: function(){
        while(true){
            let rand = Math.floor(Math.random()*this.ncols);
            if(this.board[rand]>0) return ("c"+rand);
        }
    },

    decomposeToBinary: function(x){
        //decomposes decimal number x to number array, length = 3 (0-7)
        //1 = [0,0,1], 7 = [1,1,1]
        let binaryArray = x.toString(2).split("").map(Number)
        while(binaryArray.length < 3) binaryArray.unshift(0)
        return binaryArray
    },

    getBinaryArray: function(board){
        //decomposes each column to binary, returns their sum
        sum = new Array(3)
        sum.fill(0)

        for (let i = 0; i < board.length; i++) {
            let num = this.decomposeToBinary(board[i])
            for(let j=0; j < 3; j++){
                sum[j] += num[j]
            }
        }
        return sum
    },

    balancedBoard: function(board){
        //returns true if input is a balanced board
        let binaryArray = this.getBinaryArray(board)
        let balanced = true
        for(let i = 0; i < 3; i++){
            if(binaryArray[i]%2!=0) balanced=false
        }

        return balanced
    },

    isBalanced: function(){
        return this.balancedBoard(this.board);
    },

    balancePlay: function(){
    //try to make a play that leaves the opponent with a balanced board
        if(this.isBalanced(this.board)){
            //game is already balanced
            console.log("game is already balanced")
            game.randomPlay();
        }else
            for(let col = 0; col < this.board.length; col++){
                let numPieces = this.board[col]
                if(numPieces>0){
                    //remover 1 peca e check if balanced, remover 2 e check, ate (col) 
                    for (let i = 1; i <= numPieces; i++) {
                        let tempBoard = this.board.slice()
                        tempBoard[col] -= i
                        console.log(tempBoard);
                         if(this.balancedBoard(tempBoard)){
                            //found a play that balances board
                            console.log("aiplay " + (col+1) + ": " + i + " pieces")
                            this.play("c"+col, this.board[col]-i)
                            return ["c"+col,i]
                         }
                    }
                }
            }
        },

        aiplay(){
            //se hard, sempre faz melhor jogada
            //se facil, gera num [1-3]. Se == 1, faz melhor jogada
            //se medium, gera num [1-3]. Se <= 2, faz melhor jogada
            toggleDiv("thinking");
            if(this.difficulty==Difficulty.Hard){
                this.balancePlay()
            }else{
                let rand = Math.floor(Math.random()*3)+1
                if((this.difficulty==Difficulty.Easy && rand==1)
                    || (this.difficulty==Difficulty.Medium && rand<=2)) this.balancePlay()
                else 
                    this.randomPlay()
            }
        }
    };