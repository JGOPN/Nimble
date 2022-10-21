const Difficulty = {
    Easy: 0,
    Medium: 0,
    Hard: 0
}

const players = ["Player 1", "AI", "Player 2"];

var game = {
    opponent: 0, /* 0=ai, 1=jogador */
    firstPlayer: 0, /* 0=P1, 1=ai, 2=P2*/
    difficulty: Difficulty.Easy,
    turn: 0, /* 0 ou 1 */
    board: [],
    ncols: 4,

    switchTurn: function(){
        //troca turn entre 0 e 1
        this.turn = (this.turn===0 ? 1 : 0);
    },

    turnPlayer: function(){
        //indica qual jogador (p1,ai,p2) esta jogando
        let p;
        switch (this.firstPlayer) {
            case 0:
                p = (this.turn===0) ? 0 : 1;
                break;
            case 2: 
                p = (this.turn===0) ? 2 : 0;
                break;
            default:
                p = (this.turn===0) ? 1 : 0;
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

    state: function(){
        //so considera first = p1 vs ai
        while(!this.isEmpty){
            //jogador inicial joga
            alert("vez do " + players[this.turnPlayer()]);
            game.checkWinner();
            this.switchTurn;
            //outro jogador joga
            alert("vez do " + players[this.turnPlayer()]);
            this.play(this.generateRandomPlay(),1);
            this.checkWinner();
            this.switchTurn();
        }
    },
    play: function(col,row){
        let c = parseInt(col[1]) +1;
        let r = parseInt(row) +1;
        removePieces(col,row);
        game.board[c-1]-=r;
        console.log(players[this.turnPlayer()] + " removes from column " + c + ", rows 1-"+ r);
        this.checkWinner()
        this.switchTurn();        
    },

    aiplay: function(){
        let col = this.generateRandomPlay();
        let row = countPieces(col)-1;
        row = Math.floor(Math.random()*10)%row;
        console.log("col: " + col + " row:" + row);
    },

    generateRandomPlay(){
        while(true){
            let rand = Math.floor(Math.random()*10);
            console.log(rand);
            if(this.board[rand%this.ncols]>0) return ("c"+rand%this.ncols);
        }
    }
    };