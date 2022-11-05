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
        this.currentPlayer = (this.currentPlayer==0 ? this.opponent : 0)
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

    play: function(col,npieces){
        let c = parseInt(col[1]) +1;
        let r = parseInt(npieces);
        let size = countPieces(col)

        removePieces(col,npieces);
        game.board[c-1] -= (size-npieces);
        console.log(players[this.currentPlayer] + " removes from column " + c + " npieces " + r);
        if(!this.checkWinner()){
            this.switchTurn();
            updateCurrentPlayer()
            if(this.opponent==1){
                toggleDiv("thinking");
                setTimeout(() => this.aiplay(),1000);
            }
        }
    },

    aiplay: function(){
        let col = this.generateRandomPlay();
        let npieces = countPieces(col);
        let size = document.getElementById(col).childElementCount;
        npieces = Math.floor(Math.random()*npieces);

        removePieces(col,npieces);
        game.board[col[1]] -= (size-npieces);
        console.log(players[this.currentPlayer] + " removes from column " + col + " npieces: " + (npieces+1));
        toggleDiv("thinking");
        if(!this.checkWinner()){
            if(this.opponent==1){
                this.switchTurn();
                updateCurrentPlayer()
            }
            else{
                //logica pra player 2
            }
        }
    },

    generateRandomPlay: function(){
        while(true){
            let rand = Math.floor(Math.random()*this.ncols);
            if(this.board[rand]>0) return ("c"+rand);
        }
    }
    };