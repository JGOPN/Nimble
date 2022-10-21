window.addEventListener("load",function(){
    console.log("loaded");
},false);

let boardArray;

function generateBoard(npieces,cols){
    const base = document.getElementById("gameContainer");
    const board = document.createElement('div');
    board.classList.add("board");
    game.board = new Array(cols);

    document.getElementById("start").onclick = function(){this.disabled=true;}

    for(let i=0; i<cols; i++){
        let col = document.createElement('div');
        col.classList.add("boardCol");
        col.setAttribute("id","c"+i);
        let n = Math.floor(Math.random()*4)+1; /* entre 1-5 por pilha */
        game.board[i] = n;

        for(let j=n-1; j>=0; j--){
            const piece = document.createElement("div");
            piece.classList.add("piece");
            piece.classList.add("r"+j);
            col.appendChild(piece);
        }
        board.appendChild(col);
    }

    base.append(board);
    addPieceListener();
}

function addPieceListener(){    
    let pieces = document.getElementsByClassName("piece");
    for(let piece of pieces){
        piece.addEventListener('click', () => {
            piece.addEventListener("click",game.play(
                piece.parentElement.id, piece.classList[1][1]
            ),false);
        },false)
    }
}

function removePieces(col,row){
    let column = document.getElementById(col);
    let pieces = column.childNodes;
    console.log(pieces);
    for(let i = 0; i <= row; row--){
        pieces[i].remove();
    }
}

function addPieces(n){
    //recebe n de pecas e retorna numero aleatorio entre [1,n] para ser colocada na coluna
    //o numero n (maximo de pecas maximas por cada coluna vai ser decidido no generateBoard?)
    let rand = Math.floor(Math.random() * n + 1);
    console.log("adding " + rand + " pieces")
}

function countPieces(colId){
    let col = document.getElementById(colId);
    return col.childElementCount;
}