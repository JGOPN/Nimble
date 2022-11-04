const Difficulty = {
    Easy: 0,
    Medium: 1,
    Hard: 2
}

const players = ["Player 1", "AI", "Player 2"];

var game = {
    opponent: 0, /* 0=ai, 1=jogador 2*/
    firstPlayer: 0, /* 0=P1, 1=ai, 2=P2*/
    difficulty: Difficulty.Easy,
    turn: 0, /* 0 ou 1 */
    board: [],
    ncols: 4,

    init: function(ncols,difficulty,opponent,first){
        game.board = new Array(ncols);
        this.opponent = opponent
        this.firstPlayer = first
        this.difficulty = difficulty
        this.ncols = ncols

        //If AI plays first
        if(this.firstPlayer==1){
            toggleDiv("thinking");
            setTimeout(() => this.aiplay(),1000);
        }
    },

    switchTurn: function(){
        //troca turn entre 0 e 1
        this.turn = (this.turn==0 ? 1 : 0);
    },

    turnPlayer: function(){
        //indica qual jogador (p1,ai,p2) esta jogando
        let p;
        switch (this.firstPlayer) {
            case 0:
                p = (this.turn==0) ? 0 : 1;
                break;
            case 2: 
                p = (this.turn==0) ? 2 : 0;
                break;
            default:
                p = (this.turn==0) ? 1 : 0;
                break;
        }
        return p;
    },

    isEmpty: function(){
        //true se todas colunas vazias
        for(let i=0; i<this.ncols;i++)
            if(this.board[i]>0) return false;
        return true;
    },

    checkWinner: function(){        
        let w = this.turnPlayer();
        if(this.isEmpty()){
            alert(players[w] + " wins!");
            return players[w];    
        }
        return false;
    },

    play: function(col,npieces){
        let c = parseInt(col[1]) +1;
        let r = parseInt(npieces);
        let size = countPieces(col)

        removePieces(col,npieces);
        game.board[c-1] -= (size-npieces);
        console.log(players[this.turnPlayer()] + " removes from column " + c + " npieces " + r);
        if(!this.checkWinner()){
            this.switchTurn();
            updateCurrentPlayer()
            if(this.opponent==0){
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
        console.log(players[this.turnPlayer()] + " removes from column " + col + " npieces: " + (npieces+1));
        toggleDiv("thinking");
        if(!this.checkWinner()){
            if(this.opponent==0){
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